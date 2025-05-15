import { Component } from '@angular/core';
import { Player } from '../../core/models/Player/player';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LobbyService } from '../../core/services/lobby-service.service';
import { PlayerInSlot } from '../../core/models/Player/player-in-slot';
import { PlayerSlotComponent } from '../player-slot/player-slot.component';


@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [FormsModule, CommonModule, PlayerSlotComponent],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {
    playerInLobby!: PlayerInSlot[];
    slotCount:number = 4;
    players: (Player | null)[] = [new Player("Player1", []), null, null, null];

    constructor(private lobbyService: LobbyService) {
        this.lobbyService.connect();

        this.lobbyService.playerInLobby$.subscribe((players) => {
            if(players) {
                this.playerInLobby = players;
                console.log("Players in lobby updated: ", this.playerInLobby)
            }
        }) ;
    }  
    

    public getPlayerAt(index: number): Player | null {
        for (let i = 0; i < this.playerInLobby.length; i++) {
            if (this.playerInLobby[i].getSlot() === index) {
                return this.playerInLobby[i].getPlayer();
            }
        }
        return null;
    }

    public isPlayerInLobby(index: number): boolean {
        return false; // TODO: check if player is already on lobby or not.
    }

    public allPlayersInLobby(): boolean {
        return this.playerInLobby.length != 4;
    }

    public startGame(): void {
        console.log("Start Game!");
    }
}
