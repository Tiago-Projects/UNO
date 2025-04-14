import { Card } from "../../module/card/class/card";
import { Player } from "../Player/player";

export class GameState {
    deck: Card[] = []; 
    players: Player[] = []; 
    tableCard: Card = new Card(); 

    constructor(deck: Card[] = [], players: Player[] = [], tableCard: Card = new Card()) {
        this.deck = deck;
        this.players = players;
        this.tableCard = tableCard;
    }


    public getTableCard(): Card {
        return this.tableCard;
    }

    public getPlayers(): Player[] {
        return this.players;
    }
}
