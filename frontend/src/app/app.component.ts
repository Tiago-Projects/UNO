import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameState } from './core/models/GameState/game-state';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from './core/services/web-socket.service';

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

    constructor(private gameWebSocketController: WebSocketService, private http: HttpClient) { }

    ngOnInit(): void {
        this.injectGlobalSvgFilters();          // Inject filters.svg
        this.gameWebSocketController.connect();

        this.gameWebSocketController.gameState$.subscribe((gameState) => {
            if (gameState) {
                this.gameState = gameState;
                console.log('Game state updated:', this.gameState);
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
