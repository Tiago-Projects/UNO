import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { GameState } from '../models/GameState/game-state';
import { BehaviorSubject } from 'rxjs';

import { Card } from '../models/card/card';
import { Player } from '../models/Player/player';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private client: Client;

    private gameStateSubject = new BehaviorSubject<GameState | null>(null);
    public gameState$ = this.gameStateSubject.asObservable();

    constructor() {
        this.client = new Client({
            brokerURL: `ws://${window.location.hostname}:8080/ws`,
            reconnectDelay: 5000,
        });
        
        this.client.onConnect = (frame) => {
            console.log('Game Connected: ' + frame);
            this.client.subscribe('/topic/game-state', (message) => {
                const json = JSON.parse(message.body);
                const gameState: GameState = this.mappingGameState(json);
                console.log('Received game state:', gameState);
                this.gameStateSubject.next(gameState);
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

    public requestGameState() {
        this.client.publish({
            destination: '/app/game-state',
            body: ''
        });
    }

    public drawCard() {
        this.client.publish({
            destination: '/app/draw-card',
            body: ''
        });
    }

    public disconnect() {
        this.client.deactivate();
        console.log('Disconnected from WebSocket server');
    }

    private mappingGameState(json: any): GameState {
        console.log('Mapping game state:', json.players);
        // Mapping deck
        var deck: Card[] = json.deck.allDeck.map((cardJson: any) => new Card(cardJson.suit, cardJson.type)) || [];

        // Mapping players
        var players: Player[] = json.players.map((playersJson: any) => new Player(playersJson.name, playersJson.hand.map((cardJson: any) => new Card(cardJson.suit, cardJson.type)))) || [];

        // Mapping tableCard
        var tableCard: Card = new Card(json.tableCard?.suit, json.tableCard?.type);   

        return new GameState(deck, players, tableCard);
    }

}


