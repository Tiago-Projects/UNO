import { Suit } from "../../enums/Suit";
import { Type } from "../../enums/Type";


export class Card {
    private suit: Suit;
    private type: Type;


    constructor(suit: Suit, type: Type) {
        this.suit = suit;
        this.type = type;
    }

    getSuit(): Suit {
        return this.suit;
    }

    getType(): Type {
        return this.type;
    }
}
