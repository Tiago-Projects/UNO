export enum Suit {
    NONE = "NONE",
    RED = "RED",
    YELLOW = "YELLOW",
    BLUE = "BLUE",
    GREEN = "GREEN",
    WILD = "WILD",
}

export namespace Suit {
    export function toString(suit: Suit): string {
        switch (suit) {
            case Suit.RED:
                return "Red";
            case Suit.YELLOW:
                return "Yellow";
            case Suit.BLUE:
                return "Blue";
            case Suit.GREEN:
                return "Green";
            case Suit.WILD:
                return "Wild";
            default:
                return "None";
        }
    }

    export function parse(suit: string): Suit {
        switch (suit.toUpperCase()) {
            case "RED":
                return Suit.RED;
            case "YELLOW":
                return Suit.YELLOW;
            case "BLUE":
                return Suit.BLUE;
            case "GREEN":
                return Suit.GREEN;
            case "WILD":
                return Suit.WILD;
            default:
                return Suit.NONE;
        }
    }

    export function isWild(suit: Suit): boolean {
        return suit === Suit.WILD;
    }
}