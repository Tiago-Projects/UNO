import { Suit } from "../enum/Suit";
import { Type } from "../enum/Type";


export class Card {
    private suit: Suit;
    private type: Type;


    constructor(suit: Suit = Suit.NONE, type: Type = Type.NONE) {
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
