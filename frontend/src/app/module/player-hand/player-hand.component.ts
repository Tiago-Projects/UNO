import { Component, Input } from '@angular/core';
import { Player } from '../../shared/Player/player';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-hand',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './component/player-hand.component.html',
  styleUrl: './component/player-hand.component.css'
})
export class PlayerHandComponent {
    @Input() player: Player = new Player();

    constructor() { }


    getCardDimensions(): { width: string, height: string } {
        return { width: "130px", height: "210px" };
    }

    getStyle(index: number): any {
        return {
            'z-index': String(index),
            'left': `${index * 50}px`,
            'position': 'absolute',
        }
    }
}
