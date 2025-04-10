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

    getColor(): string {
        if (!this.card) return 'white';
        const suit = this.card.getSuit();
        if(suit === "WILD") return 'black';
        return suit;
    }

    getType(): string {
        if (!this.card) return 'none';

        const type = this.card.getType();

        if (type === "ZERO") return '0';
        if (type === "ONE") return '1';
        if (type === "TWO") return '2';
        if (type === "THREE") return '3';
        if (type === "FOUR") return '4';
        if (type === "FIVE") return '5';
        if (type === "SIX") return '6';
        if (type === "SEVEN") return '7';
        if (type === "EIGHT") return '8';
        if (type === "NINE") return '9';
        if (type === "REVERSE") return 'Reverse';
        if (type === "SKIP") return 'Skip';
        if (type === "DRAW_TWO") return '+2';
        if (type === "WILD") return 'Wild';
        if (type === "WILD_DRAW_FOUR") return '+4';

        return 'none';  
    }
}
