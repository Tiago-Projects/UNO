import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Player } from '../models/Player/player';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../models/card/card';

@Injectable({
    providedIn: 'root'
})
export class LobbyService {
    private client: Client;

    private playersSubject = new BehaviorSubject<Player[]>([]);
    public players$ = this.playersSubject.asObservable();

    private playerConnectionSubject = new BehaviorSubject<boolean>(false);
    public playersConnection$ = this.playerConnectionSubject.asObservable();

    constructor() { 
        this.client = new Client({
            brokerURL: `ws://${window.location.hostname}:8080/ws`,
            reconnectDelay: 5000,
        });

        this.client.onConnect = (frame) => {
            console.log('Lobby Connected: ' + frame);

            // Subscribe to get players
            this.client.subscribe('/topic/lobby/getPlayers', (message) => {
                const json = JSON.parse(message.body);
                const players: Player[] = this.mappingPlayers(json);
                console.log('Received player list:', players);
                this.playersSubject.next(players);
            });

            // Subscribe to add players
            this.client.subscribe('/topic/lobby/join', () => {
                console.log("Join");
            });

            // Subscribe to check connection
            this.client.subscribe('/topic/lobby/check-connection', (message) => {
                const json = JSON.parse(message.body);
                console.log(json);
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

    public connect() {
        this.client.activate();
    }

    public joinLobby(name: string): void {
        this.client.publish({
            destination: '/app/lobby/join',
            body: JSON.stringify({name: name })
        });

        setTimeout(() => this.getPlayers(), 500);
    }

    public getPlayers(): void {
        this.client.publish({
            destination: '/app/lobby/getPlayers',
            body: ''
        });
    }

    public checkConnection(): void {
        this.client.publish({
            destination: '/app/lobby/check-connection',
            body: ''
        });
    }

    
    private mappingPlayers(json: any): Player[] {
        console.log('Mapping players:', json);

        var players: Player[] = json.map((playersJson: any) => new Player(playersJson.name, playersJson.hand.map((cardJson: any) => new Card(cardJson.suit, cardJson.type)))) || [];

        return players;
    }
}
