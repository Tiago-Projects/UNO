import { Component, Input } from '@angular/core';
import { Player } from '../../core/models/Player/player';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-hand',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './player-hand.component.html',
  styleUrl: './player-hand.component.css'
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
            'left': `${index * 75}px`,
            'position': 'absolute',
        }
    }
}
