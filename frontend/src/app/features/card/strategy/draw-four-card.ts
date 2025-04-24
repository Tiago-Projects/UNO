import { CardStrategy } from "./card-strategy.interface";

export class DrawFourCard implements CardStrategy{
    constructor() {
    }

    renderCard(): string {
        return `draw-four`;
    }

}