import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Player } from '../models/Player/player';
import { BehaviorSubject, filter, Observable, Subject, switchMap, take, tap } from 'rxjs';
import { Card } from '../models/card/card';
import { PlayerInSlot } from '../models/Player/player-in-slot';

@Injectable({
    providedIn: 'root'
})
export class LobbyService {
    private client: Client;

    private readonly TOPIC: string = '/topic'
    private readonly APP: string = '/app'
    private readonly REPOSITORY_ADD: string = '/repository/add';
    private readonly LOBBY_ADD: string = '/lobby/add';
    private readonly LOBBY_ADD_BOT: string = '/lobby/addBot';
    private readonly LOBBY_GET: string = '/lobby/get';
    private readonly GLOBAL_CHECK_CONNECTION: string = '/global/check-connection';

    private isConnectedSubject = new Subject<boolean>();
    public isConnected$ = this.isConnectedSubject.asObservable();

    private connectedSubject = new BehaviorSubject<boolean>(false);
    public connected$ = this.connectedSubject.asObservable();

    private playerInLobbySubject = new BehaviorSubject<PlayerInSlot[]>([]);
    public playerInLobby$ = this.playerInLobbySubject.asObservable();

    constructor() {
        this.client = new Client({
            brokerURL: `ws://${window.location.hostname}:8080/ws`,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        this.client.onConnect = (frame) => {
            console.log('Lobby Connected: ' + frame);

            this.subscribeToTopic(this.TOPIC + this.LOBBY_ADD, this.mappingPlayers, this.playerInLobbySubject);
            this.subscribeToTopic(this.TOPIC + this.LOBBY_ADD_BOT, this.mappingPlayers, this.playerInLobbySubject);
            this.subscribeToTopic(this.TOPIC + this.LOBBY_GET, this.mappingPlayers, this.playerInLobbySubject);

            this.client.subscribe(this.TOPIC + this.REPOSITORY_ADD, () => { });

            // Subscribe to check connection
            this.client.subscribe("/topic/repository/checkPlayer", (message) => {
                this.isConnectedSubject.next(message.body === "true");
            });

            this.connectedSubject.next(true);
        }

        this.client.onWebSocketError = (error) => {
            console.error('WebSocket error:', error);
        }

        this.client.onStompError = (frame) => {
            console.error('Stomp error:', frame.headers['message']);
            console.error('Additional details:', frame.body);
        }
    }

    private subscribeToTopic(topic: string, mapper: any, subject: BehaviorSubject<any>): void {
        this.client.subscribe(topic, (message) => {
            const mapped = mapper(JSON.parse(message.body));
            console.log(mapped);
            subject.next(mapped);
        })
    }

    public connect(): void {
        this.client.activate();
    }

    public disconnect(): void {
        this.client.deactivate();
    }

    public connectPlayer(name: string): void {
        this.client.publish({
            destination: '/app/repository/add',
            body: JSON.stringify({ playerId: this.getOrCreatePlayerId(), name: name })
        });
    }

    public checkPlayer(): void {
        this.client.publish({
            destination: '/app/repository/checkPlayer',
            body: JSON.stringify({ playerId: this.getOrCreatePlayerId() })
        });
    }

    public checkPlayerStatus(): Observable<boolean> {
        return this.connected$.pipe(
            filter(connected => connected),
            take(1),
            switchMap(() => {
                return this.isConnected$.pipe(take(1));
            }),
            tap(() => {
                this.checkPlayer();
            })
        );
    }

    private mappingPlayers(json: JSON): PlayerInSlot[] {
        if (!Array.isArray(json)) return [];

        const players: PlayerInSlot[] = json.map((playerJson: any) => {

            if (!playerJson.playerDto) return new PlayerInSlot(playerJson.slot, null);

            const name = playerJson.playerDto.name;
            const handJson = playerJson.playerDto.hand;

            const hand = handJson.map((cardJson: any) => {
                const suit = cardJson.suit;
                const type = cardJson.type;
                return new Card(suit, type);
            })

            return new PlayerInSlot(playerJson.slot, new Player(name, hand));
        });

        return players;
    }

    private getOrCreatePlayerId(): string {
        const storedId = localStorage.getItem('playerId');
        if (storedId) return storedId;

        const newId = this.fallbackUUID();
        localStorage.setItem('playerId', newId);
        return newId;
    }

    public getPlayerId(): string | null {
        return localStorage.getItem('playerId');
    }

    private fallbackUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
