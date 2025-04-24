export enum Type {
    ZERO = "ZERO",
    ONE = "ONE",
    TWO = "TWO",
    THREE = "THREE",
    FOUR = "FOUR",
    FIVE = "FIVE",
    SIX = "SIX",
    SEVEN = "SEVEN",
    EIGHT = "EIGHT",
    NINE = "NINE",
    REVERSE = "REVERSE",
    SKIP = "SKIP",
    DRAW_TWO = "DRAW_TWO",
    WILD = "WILD",
    WILD_DRAW_FOUR = "WILD_DRAW_FOUR",
    NONE = "NONE",
}

export namespace Type {
    export function toString(type: Type): string {
        switch (type) {
            case Type.ZERO:
                return "0";
            case Type.ONE:
                return "1";
            case Type.TWO:
                return "2";
            case Type.THREE:
                return "3";
            case Type.FOUR:
                return "4";
            case Type.FIVE:
                return "5";
            case Type.SIX:
                return "6";
            case Type.SEVEN:
                return "7";
            case Type.EIGHT:
                return "8";
            case Type.NINE:
                return "9";
            case Type.REVERSE:
                return "Reverse";
            case Type.SKIP:
                return "Skip";
            case Type.DRAW_TWO:
                return "Draw Two";
            case Type.WILD:
                return "Wild";
            case Type.WILD_DRAW_FOUR:
                return "Wild Draw Four";
            default:
                return "None";
        }
    }

    export function parse(type: string): Type {
        switch (type.toUpperCase()) {
            case "ZERO":
                return Type.ZERO;
            case "ONE":
                return Type.ONE;
            case "TWO":
                return Type.TWO;
            case "THREE":
                return Type.THREE;
            case "FOUR":
                return Type.FOUR;
            case "FIVE":
                return Type.FIVE;
            case "SIX":
                return Type.SIX;
            case "SEVEN":
                return Type.SEVEN;
            case "EIGHT":
                return Type.EIGHT;
            case "NINE":
                return Type.NINE;
            case "REVERSE":
                return Type.REVERSE;
            case "SKIP":
                return Type.SKIP;
            case "DRAW_TWO":
                return Type.DRAW_TWO;
            case "WILD":
                return Type.WILD;
            case "WILD_DRAW_FOUR":
                return Type.WILD_DRAW_FOUR;
            default:
                return Type.NONE;
        }
    }

    export function getNumber(type: Type): number {
        switch (type) {
            case Type.ZERO:
                return 0;
            case Type.ONE:
                return 1;
            case Type.TWO:
                return 2;
            case Type.THREE:
                return 3;
            case Type.FOUR:
                return 4;
            case Type.FIVE:
                return 5;
            case Type.SIX:
                return 6;
            case Type.SEVEN:
                return 7;
            case Type.EIGHT:
                return 8;
            case Type.NINE:
                return 9;
            default:
                return -1; // or throw an error
        }
    }

    export function isNumber(type : Type): boolean {
        return type === Type.ZERO || type === Type.ONE || type === Type.TWO || type === Type.THREE || type === Type.FOUR || type === Type.FIVE || type === Type.SIX || type === Type.SEVEN || type === Type.EIGHT || type === Type.NINE;
    }

    export function isSkip(type: Type): boolean {
        return type === Type.SKIP;
    }

    export function isDrawTwo(type: Type): boolean {
        return type === Type.DRAW_TWO;
    }

    export function isReverse(type: Type): boolean {
        return type === Type.REVERSE;
    }
}