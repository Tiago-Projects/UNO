import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Card } from '../../core/models/card/card';
import { CardStrategy } from './strategy/card-strategy.interface';
import { CardStrategyFactory } from './strategy/card-strategy-factory';
import { Type } from '../../core/enums/Type';

import { NumberSVGComponent } from '../../shared/SVG/number-svg.component';
import { SkipSVGComponent } from '../../shared/SVG/skip-svg.component';
import { DrawTwoMiddleSVGComponent } from '../../shared/SVG/draw-two/draw-two-middle-svg.component';
import { DrawTwoSVGComponent } from '../../shared/SVG/draw-two/draw-two-svg.component';
import { Suit } from '../../core/enums/Suit';
import { ReverseSVGComponent } from '../../shared/SVG/reverse-svg.component';
import { DrawFourSVGComponent } from '../../shared/SVG/draw-four/draw-four-svg.component';
import { DrawFourMiddleSVGComponent } from '../../shared/SVG/draw-four/draw-four-middle-svg.component';


@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule, NumberSVGComponent, SkipSVGComponent, DrawTwoMiddleSVGComponent, DrawTwoSVGComponent, ReverseSVGComponent, DrawFourSVGComponent, DrawFourMiddleSVGComponent],
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.css'],
})
export class CardComponent implements OnInit{
    @Input() card_dimensions: {width: string, height: string} = { width: "100px", height: "150px" };
    @Input({ required: true }) card!: Card;
    inverse: boolean = false;

    strategy!: CardStrategy;
    
    constructor() {
    };

    ngOnInit() {
        this.strategy = CardStrategyFactory.create(this.card);
        console.log("Strategy: " + this.strategy);
    }

    getNumber(): number {
        return Type.getNumber(this.card.getType());
    }

    getColor(): string {
        return Suit.getColor(this.card.getSuit());
    }
}
