import { Type } from "../../../core/enums/Type";
import { Card } from "../../../core/models/card/card";

import { CardStrategy } from "./card-strategy.interface";

import { NumberCard } from "./number-card";
import { SkipCard } from "./skip-card";
import { DrawTwoCard } from "./draw-two-card";

export class CardStrategyFactory {
    static create(card: Card): CardStrategy {
        const type = card.getType();

        if (Type.isNumber(type)) {
            return new NumberCard(Type.getNumber(type));
        }

        if (Type.isSkip(type)) {
            return new SkipCard();
        }

        if (Type.isDrawTwo(type)) {
            return new DrawTwoCard();
        }

        throw new Error(`No strategy found for card type: ${type}`);
    }
}