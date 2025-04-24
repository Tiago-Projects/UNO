import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameWebSocketControllerService } from './core/services/GameWebSocketController/game-web-socket-controller.service';
import { CardComponent } from './features/card/card.component';
import { CommonModule } from '@angular/common';
import { GameState } from './core/models/GameState/game-state';
import { PlayerHandComponent } from './features/player-hand/player-hand.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CardComponent, PlayerHandComponent, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

    title = 'UNO';
    gameState!: GameState;


    constructor(private gameWebSocketController: GameWebSocketControllerService, private http: HttpClient) { }

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


    drawCard() {
        this.gameWebSocketController.drawCard();
    }



    getSmallestCardDimensions(): { width: string, height: string } {
        return { width: "65px", height: "105px" };
    }

    getMediumCardDimensions(): { width: string, height: string } {
        return { width: "130px", height: "210px" };
    }

    getBiggestCardDimensions(): { width: string, height: string } {
        return { width: "260px", height: "420px" };
    }


}
