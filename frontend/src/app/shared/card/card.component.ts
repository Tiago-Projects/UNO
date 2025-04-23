import { Component, Input } from '@angular/core';
import { Card } from '../../core/models/card/card';
import { CommonModule } from '@angular/common';
import { CardIconComponent } from '../card-icon/card-icon.component';


@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule, CardIconComponent],
    templateUrl: 'component/card.component.html',
    styleUrls: ['component/card.component.css'],
})
export class CardComponent {
    @Input() card_dimensions: {width: string, height: string} = { width: "100px", height: "150px" };
    @Input({ required: true }) card!: Card;
    inverse: boolean = false;


    constructor() {
    };

    getColor(): string {
        if (!this.card) return 'white';
        const suit = this.card.getSuit();
        if(suit === "WILD") return 'black';
        return suit;
    }

    isSkipCard(): boolean {
        if (!this.card) return false;
        const type = this.card.getType();
        return type === "SKIP";
    }

    getType(): string {
        if (!this.card) return 'none';

        const type = this.card.getType();
        return type;  
    }
}
