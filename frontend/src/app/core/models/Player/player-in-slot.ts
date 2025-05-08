import { Player } from "./player";


export class PlayerInSlot {
    private slot: number;
    private player: Player | null;

    constructor(slot: number, player: Player | null) {
        this.slot = slot;
        this.player = player;
    }

    public getSlot(): number {
        return this.slot;
    }

    public getPlayer(): Player | null {
        return this.player;
    }
}
