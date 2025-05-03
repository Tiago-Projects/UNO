import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CardComponent } from './features/card/card.component';
import { CommonModule } from '@angular/common';
import { GameState } from './core/models/GameState/game-state';
import { PlayerHandComponent } from './features/player-hand/player-hand.component';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';
import { WebSocketService } from './core/services/web-socket.service';
import { LobbyService } from './core/services/lobby-service.service';

import {filter, switchMap, take} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CardComponent, PlayerHandComponent, CommonModule, HomeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

    title = 'UNO';
    gameState!: GameState;

    constructor(private gameWebSocketController: WebSocketService, private lobbyService: LobbyService, private http: HttpClient, private router: Router) {
        this.injectGlobalSvgFilters();          // Inject filters.svg

        this.gameWebSocketController.connect();
        this.lobbyService.connect();

        this.gameWebSocketController.gameState$.subscribe((gameState) => {
            if (gameState) {
                this.gameState = gameState;
                console.log('Game state updated:', this.gameState);
            }
        });

        

        setTimeout(() => this.lobbyService.checkConnection(), 100);
        this.lobbyService.isConnected$.pipe(
            filter(connected => connected),
            take(1),
            switchMap(() => {
                this.lobbyService.checkConnection();
                return this.lobbyService.isConnected$;
            })
        ).subscribe((connected) => {
            if (!connected && this.router.url !== '/home') {
                this.router.navigate(['/home']);
            }
        });
        
    }
    
    private injectGlobalSvgFilters(): void {
        this.http.get('assets/filters.svg', { responseType: 'text' }).subscribe((svgContent) => {
            const div = document.createElement('div');
            div.innerHTML = svgContent;
            document.body.insertBefore(div, document.body.firstChild);
        });
    }
}
