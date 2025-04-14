import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameWebSocketControllerService } from './shared/GameWebSocketController/game-web-socket-controller.service';
import { CardComponent } from './module/card/card.component';
import { CommonModule } from '@angular/common';
import { GameState } from './shared/GameState/game-state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

    title = 'UNO';
    gameState: GameState = new GameState();


    constructor(private gameWebSocketController: GameWebSocketControllerService) {}

    ngOnInit(): void {
        this.gameWebSocketController.connect();

        this.gameWebSocketController.gameState$.subscribe((gameState) => {
            if (gameState) {
                this.gameState = gameState;
                console.log('Game state updated:', this.gameState);
            }
        });
    }
}
