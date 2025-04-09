import { inject, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GameControllerService } from './shared/GameController/game-controller.service';
import { Suit } from './module/card/enum/Suit';
import { Type } from './module/card/enum/Type';
import { Card } from './module/card/class/card';
import { CardComponent } from './module/card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'UNO';
    gameController = inject(GameControllerService);

    protected newCard = new Card(Suit.GREEN, Type.TWO);

    getCard() {
        return this.gameController.getCard();
    }

    onNgInit() {
        var card = this.getCard();
        console.log(card);
    }
}
