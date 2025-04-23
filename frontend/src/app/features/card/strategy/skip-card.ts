import { CardStrategy } from "./card-strategy.interface";


export class SkipCard implements CardStrategy {

    constructor() {
    }

    renderCard(): string {
        return `skip`;
    }
}