import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject, filter, Observable, Subject, switchMap, take, tap } from 'rxjs';
import { PlayerToRepositoryDto } from '../Dto/player-to-repository.dto';
import { CheckPlayerDto } from '../Dto/check-player.dto';
import { PlayerExistsResponse } from '../Dto/player-exists-response';

@Injectable({
    providedIn: 'root'
})
export class LobbyService {
    private client: Client;

    private stompConnectedSubject = new Subject<boolean>();
    public stompConnected$ = this.stompConnectedSubject.asObservable();

    private isConnectedSubject = new BehaviorSubject<boolean>(false);
    public isConnected$ = this.isConnectedSubject.asObservable();

    constructor() {
        this.client = new Client({
            brokerURL: `ws://${window.location.hostname}:8080/ws`,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        this.client.onConnect = (frame) => {
            console.log('Lobby Connected: ' + frame);

            this.client.subscribe("/topic/repository/add", () => { });

            this.client.subscribe("/user/queue/player/exists", (message) => {
                const response: PlayerExistsResponse = JSON.parse(message.body);
                this.isConnectedSubject.next(response.exists);
            });

            this.stompConnectedSubject.next(true);
        }

        this.client.onWebSocketError = (error) => {
            console.error('WebSocket error:', error);
        }

        this.client.onStompError = (frame) => {
            console.error('Stomp error:', frame.headers['message']);
            console.error('Additional details:', frame.body);
            this.stompConnectedSubject.next(false);
        }
    }

    public connect(): void {
        this.client.activate();
    }

    public disconnect(): void {
        this.client.deactivate();
    }

    public connectPlayer(name: string): void {
        const dto: PlayerToRepositoryDto = {
            playerId: this.getOrCreatePlayerId(),
            name: name
        }

        this.client.publish({
            destination: '/app/player/add',
            body: JSON.stringify(dto)
        });
    }

    public checkPlayer(): void {
        const dto: CheckPlayerDto = {
            playerId: this.getOrCreatePlayerId()
        }
        
        this.client.publish({
            destination: '/app/player/exists',
            body: JSON.stringify(dto)
        });
    }

    public checkPlayerStatus(): Observable<boolean> {
        return this.stompConnected$.pipe(
            filter(connected => connected),
            take(1),
            tap(() => {
                this.checkPlayer();
            }),
            switchMap(() => {
                return this.isConnected$.pipe(take(1));
            })
        );
    }
    
    private getOrCreatePlayerId(): string {
        const storedId = localStorage.getItem('playerId');
        if (storedId) return storedId;

        const newId = this.fallbackUUID();
        localStorage.setItem('playerId', newId);
        return newId;
    }


    private fallbackUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
