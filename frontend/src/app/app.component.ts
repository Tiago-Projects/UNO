import { inject, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GameControllerService } from './shared/GameController/game-controller.service';
import { Card } from './module/card/class/card';
import { CardComponent } from './module/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'UNO';
    gameController = inject(GameControllerService);

    deck: Card[] = [];

    getDeck(): void {
        this.gameController.getDeck().subscribe(
            newDeck => {
                console.log(newDeck);
                this.deck = newDeck;
            }
        );
    }

    startGame(): void {
        this.gameController.startGame().subscribe(
            response => {
                console.log(response);
            }
        );
    }

    onNgInit() {}
}
