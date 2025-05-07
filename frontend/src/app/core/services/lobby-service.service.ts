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

    private isConnectedSubject = new BehaviorSubject<boolean>(false);
    public isConnected$ = this.isConnectedSubject.asObservable();

    private playerInLobbySubject = new BehaviorSubject<boolean>(false);
    public playerInLobby$ = this.playerInLobbySubject.asObservable();

    constructor() { 
        this.client = new Client({
            brokerURL: `ws://${window.location.hostname}:8080/ws`,
            reconnectDelay: 5000,
        });

        this.client.onConnect = (frame) => {
            console.log('Lobby Connected: ' + frame);
            this.isConnectedSubject.next(true);

            // Subscribe to get players
            this.client.subscribe('/topic/lobby/getConnectedPlayers', (message) => {
                const json = JSON.parse(message.body);
                const players: Player[] = this.mappingPlayers(json);
                console.log('Received player list:', players);
                this.playersSubject.next(players);
            });

            // Subscribe to add connected players
            this.client.subscribe('/topic/lobby/joinConnected', () => {
                console.log("Join");
            });

            // Subscribe to check connection
            this.client.subscribe('/topic/lobby/check-connection', (message) => {
                this.isConnectedSubject.next(message.body === "true");
            });

            // Subscribe to add player to lobby
            this.client.subscribe('/topic/lobbyaddPlayerToLobby', () => {
                console.log("Add player to lobby.");
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
        const playerId = this.getOrCreatePlayerId();
        console.log(playerId);

        this.client.publish({
            destination: '/app/lobby/joinConnected',
            body: JSON.stringify({ name: name, playerId: playerId })
        });

        setTimeout(() => this.getConnectedPlayers(), 100);
        setTimeout(() => this.getPlayersInLobby(), 100);
    }

    public addPlayerToLobby(): void {
        const UUDI = this.getPlayerId();
        if (!UUDI) return;

        this.client.publish({
            destination: '/app/lobby/joinConnected',
            body: JSON.stringify({UUID: UUDI})
        });

        setTimeout(() => this.getConnectedPlayers(), 100);
        setTimeout(() => this.getPlayersInLobby(), 100);
    }

    public getConnectedPlayers(): void {
        this.client.publish({
            destination: '/app/lobby/getConnectedPlayers',
            body: ''
        });
    }

    public getPlayersInLobby(): void {
        this.client.publish({
            destination: '/app/lobby/getPlayersInLobby'
        });
    }

    public checkConnection(): void {
        const playerId = this.getOrCreatePlayerId();
        console.log(playerId);
        this.client.publish({
            destination: '/app/lobby/check-connection',
            body: playerId
        });
    }

    
    private mappingPlayers(json: any): Player[] {
        console.log('Mapping players:', json);

        var players: Player[] = json.map((playersJson: any) => new Player(playersJson.name, playersJson.hand.map((cardJson: any) => new Card(cardJson.suit, cardJson.type)))) || [];

        return players;
    }

    private getOrCreatePlayerId(): string {
        const storedId = localStorage.getItem('playerId');
        if (storedId) return storedId;

        const newId = this.fallbackUUID();
        localStorage.setItem('playerId', newId);
        return newId;
    }

    private getPlayerId(): string | undefined {
        const storedId = localStorage.getItem('playerId');
        if (storedId) return storedId;
        return undefined;
    }
    
    private fallbackUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
