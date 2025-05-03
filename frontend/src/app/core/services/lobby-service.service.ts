import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';

@Injectable({
    providedIn: 'root'
})
export class LobbyService {
    private client: Client;

    constructor() { 
        this.client = new Client({
            brokerURL: `ws://${window.location.hostname}:8080/ws`,
            reconnectDelay: 5000,
        });

        this.client.activate();
    }

    public joinLobby(name: string): void {
        this.client.publish({
            destination: '/app/lobby/join',
            body: JSON.stringify({name: name })
        });
    }
}
