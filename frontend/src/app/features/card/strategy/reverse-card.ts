import { CardStrategy } from "./card-strategy.interface";

export class ReverseCard implements CardStrategy {
    constructor() {
    }

    renderCard(): string {
        return "reverse";
    }
}