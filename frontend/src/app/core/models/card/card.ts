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

    getNumber(): number {
        // TODO: OBVIOUSLY change this 
        if (this.type === "ZERO") {
            return 0;
        }
        if (this.type === "ONE") {
            return 1;
        }
        if (this.type === "TWO") {
            return 2;
        }
        if (this.type === "THREE") {
            return 3;
        }
        if (this.type === "FOUR") {
            return 4;
        }
        if (this.type === "FIVE") {
            return 5;
        }
        if (this.type === "SIX") {
            return 6;
        }
        if (this.type === "SEVEN") {
            return 7;
        }
        if (this.type === "EIGHT") {
            return 8;
        }
        if (this.type === "NINE") {
            return 9;
        }
        return -1;
    }
}
