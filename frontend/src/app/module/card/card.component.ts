import { Component, Input } from '@angular/core';
import { Card } from './class/card';
import { CommonModule } from '@angular/common';
import { Suit } from './enum/Suit';
import { Type } from './enum/Type';


@Component({
    selector: 'card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'component/card.component.html',
    styleUrls: ['component/card.component.css'],
})
export class CardComponent {
    @Input({ required: true }) card: Card | undefined;
    inverse: boolean = false;


    constructor() {
    };

    getColor() {
        if (!this.card) return 'white';

        const suit = this.card.getSuit();

        switch (suit) {
            case Suit.RED: return 'red';
            case Suit.YELLOW: return 'yellow';
            case Suit.BLUE: return 'blue';
            case Suit.GREEN: return 'green';
            case Suit.BLACK: return 'black';
            default: return 'white';
        }
    }

    getType() {
        if (!this.card) return 'none';

        const type = this.card.getType();

        switch (type) {
            case Type.NONE: return 'none';
            case Type.REVERSE: return 'reverse';
            case Type.SKIP: return 'skip';
            case Type.DRAW_TWO: return '+2';
            case Type.WILD: return 'wild';
            case Type.WILD_DRAW_FOUR: return '+4';
            default: return type.toString().toLowerCase();
        }
    }
}
