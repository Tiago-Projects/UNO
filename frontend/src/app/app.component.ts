import { inject, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GameControllerService } from './shared/GameController/game-controller.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'UNO';
    gameController = inject(GameControllerService);

    getCard(): void {
        console.log("Hello")
        this.gameController.getCard();
    }

    onNgInit() {

    }
}
