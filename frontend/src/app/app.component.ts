import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameState } from './core/models/GameState/game-state';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from './core/services/web-socket.service';
import { LobbyService } from './core/services/lobby-service.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

    title = 'UNO';
    gameState!: GameState;

    constructor(private gameWebSocketController: WebSocketService, private lobbyService: LobbyService, private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        this.injectGlobalSvgFilters();          // Inject filters.svg

        this.gameWebSocketController.connect();
        this.lobbyService.connect();

        this.gameWebSocketController.gameState$.subscribe((gameState) => {
            if (gameState) {
                this.gameState = gameState;
                console.log('Game state updated:', this.gameState);
            }
        });

        this.lobbyService.playersConnection$.subscribe((connected) => {
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
