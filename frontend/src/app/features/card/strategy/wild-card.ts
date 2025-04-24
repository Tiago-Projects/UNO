import { CardStrategy } from "./card-strategy.interface";

export class WildCard implements CardStrategy {
    constructor() {
    }

    renderCard(): string {
        return "wild";
    }
}