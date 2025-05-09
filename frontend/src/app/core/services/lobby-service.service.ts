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

            // Subscribe to add connected players
            this.client.subscribe('/topic/repository/add', (message) => {
                const players: (Player[]) = this.mappingRepositoryPlayers(JSON.parse(message.body));
                console.log('Received connected player list:', players);
                this.playersConnectedSubject.next(players);
            });

            // Subscribe to get connected players
            this.client.subscribe('/topic/repository/get', (message) => {
                const players: (Player[]) = this.mappingRepositoryPlayers(JSON.parse(message.body));
                console.log('Received connected player list:', players);
                this.playersConnectedSubject.next(players);
            });


            // Subscribe to add player to lobby
            this.client.subscribe('/topic/lobby/add', (message) => {
                const players: PlayerInSlot[] = this.mappingPlayers(JSON.parse(message.body));
                console.log('Received player list:', players);
                this.playerInLobbySubject.next(players);
            });

            // Subscribe to get players in lobby
            this.client.subscribe('/topic/lobby/get', (message) => {
                const players: PlayerInSlot[] = this.mappingPlayers(JSON.parse(message.body));
                console.log('Received player list:', players);
                this.playerInLobbySubject.next(players);
            });

            

            // Subscribe to check connection
            this.client.subscribe('/topic/global/check-connection', (message) => {
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

    public connect() {
        this.client.activate();
    }

    public joinLobby(name: string): void {
        const playerId = this.getOrCreatePlayerId();

        this.client.publish({
            destination: '/app/repository/add',
            body: JSON.stringify({ name: name, playerId: playerId })
        });
    }

    public getConnectedPlayers(): void {
        this.client.publish({
            destination: '/app/repository/get',
            body: ''
        });
    }

    public getPlayersInLobby(): void {
        this.client.publish({
            destination: '/app/lobby/get',
            body: ''
        });
    }

    public checkConnection(): void {
        const playerId = this.getOrCreatePlayerId();
        this.client.publish({
            destination: '/app/global/check-connection',
            body: playerId
        });
    }

    public joinPlayerSlot(slot: number): void {
        this.client.publish({
            destination: '/app/lobby/add',
            body: JSON.stringify({UUID: this.getPlayerId(), slot: slot})
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
                const type = cardJson.suit;
                return new Card(suit, type);
            })

            return new PlayerInSlot(playerJson.slot , new Player(name, hand));
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
