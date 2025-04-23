import { CardStrategy } from "./card-strategy.interface";

export class NumberCard implements CardStrategy {

    private number: number;

    constructor(number: number) {
        this.number = number;
    }

    renderCard(): string {
        return "number";
    }

    getNumber(): number {
        return this.number;
    }
}