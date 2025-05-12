import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Player } from '../models/Player/player';
import { BehaviorSubject } from 'rxjs';
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
    private readonly REPOSITORY_GET: string = '/repository/get';
    private readonly LOBBY_ADD: string = '/lobby/add';
    private readonly LOBBY_ADD_BOT: string = '/lobby/addBot';
    private readonly LOBBY_GET: string = '/lobby/get';
    private readonly GLOBAL_CHECK_CONNECTION: string = '/global/check-connection';

    private playersConnectedSubject = new BehaviorSubject<Player[]>([]);
    public playersConnected$ = this.playersConnectedSubject.asObservable();

    private isConnectedSubject = new BehaviorSubject<boolean>(false);
    public isConnected$ = this.isConnectedSubject.asObservable();

    private playerInLobbySubject = new BehaviorSubject<PlayerInSlot[]>([]);
    public playerInLobby$ = this.playerInLobbySubject.asObservable();

    constructor() {
        this.client = new Client({
            brokerURL: `ws://${window.location.hostname}:8080/ws`,
            reconnectDelay: 5000,
        });

        this.client.onConnect = (frame) => {
            console.log('Lobby Connected: ' + frame);
            this.isConnectedSubject.next(true);

            this.subscribeToTopic(this.TOPIC + this.REPOSITORY_ADD, this.mappingRepositoryPlayers, this.playersConnectedSubject);
            this.subscribeToTopic(this.TOPIC + this.REPOSITORY_GET, this.mappingRepositoryPlayers, this.playersConnectedSubject);
            this.subscribeToTopic(this.TOPIC + this.LOBBY_ADD, this.mappingPlayers, this.playerInLobbySubject);
            this.subscribeToTopic(this.TOPIC + this.LOBBY_ADD_BOT, this.mappingPlayers, this.playerInLobbySubject);
            this.subscribeToTopic(this.TOPIC + this.LOBBY_GET, this.mappingPlayers, this.playerInLobbySubject);


            // Subscribe to check connection
            this.client.subscribe(this.TOPIC + this.GLOBAL_CHECK_CONNECTION, (message) => {
                this.isConnectedSubject.next(message.body === "true");
            });
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

    public connect() {
        this.client.activate();
    }

    public disconnect() {
        this.client.deactivate();
    }

    public joinLobby(name: string): void {
        const playerId = this.getOrCreatePlayerId();

        this.client.publish({
            destination: this.APP + this.REPOSITORY_ADD,
            body: JSON.stringify({ name: name, playerId: playerId })
        });
    }

    public getConnectedPlayers(): void {
        this.client.publish({
            destination: this.APP + this.REPOSITORY_GET,
            body: ''
        });
    }

    public joinPlayerSlot(slot: number): void {
        this.client.publish({
            destination: this.APP + this.LOBBY_ADD,
            body: JSON.stringify({ UUID: this.getPlayerId(), slot: slot })
        });
    }

    public addBotToSlot(slot: number): void {
        this.client.publish({
            destination: this.APP + this.LOBBY_ADD_BOT,
            body: JSON.stringify({ slot: slot })
        });
    }

    public getPlayersInLobby(): void {
        this.client.publish({
            destination: this.APP + this.LOBBY_GET,
            body: ''
        });
    }

    public checkConnection(): void {
        const playerId = this.getOrCreatePlayerId();
        this.client.publish({
            destination: this.APP + this.GLOBAL_CHECK_CONNECTION,
            body: playerId
        });
    }





    private mappingRepositoryPlayers(json: JSON): Player[] {
        if (!Array.isArray(json)) {
            return [];
        }

        const players: Player[] = json.map((playerJson: any) => {

            const name = playerJson.name;
            const handJson = Array.isArray(playerJson?.hand) ? playerJson.hand : [];

            const hand = handJson.map((cardJson: any) => {
                const suit = cardJson.suit;
                const type = cardJson.type;
                return new Card(suit, type);
            })

            return new Player(name, hand);
        });

        return players;
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
