import { CardStrategy } from "./card-strategy.interface";

export class DrawTwoCard implements CardStrategy{
    constructor() {
    }

    renderCard(): string {
        return `draw-two`;
    }

}