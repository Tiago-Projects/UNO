import { Card } from "../../module/card/class/card";

export class Player {
    name: string = '';
    hand: Card[] = []; 

    constructor(name: string = '', hand: Card[] = []) {
        this.name = name;
        this.hand = hand;
    }

    public getName(): string {
        return this.name;
    }
    
    public getHand(): Card[] {
        return this.hand;
    }
}
