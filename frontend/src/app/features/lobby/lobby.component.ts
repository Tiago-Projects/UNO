import { Component } from '@angular/core';
import { Player } from '../../core/models/Player/player';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LobbyService } from '../../core/services/lobby-service.service';
import { PlayerInSlot } from '../../core/models/Player/player-in-slot';


@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {
    connectedPlayers!: (Player | null)[];
    playerInLobby!: PlayerInSlot[];
    slotCount:number = 4;


    constructor(private lobbyService: LobbyService) {
        this.lobbyService.connect();

        this.lobbyService.isConnected$.subscribe((connected) => {
            if (connected) {
                this.lobbyService.getConnectedPlayers();
                this.lobbyService.getPlayersInLobby();
            }
        });

        this.lobbyService.playersConnected$.subscribe((players) => {
            if (players) {
                this.connectedPlayers = players;
                console.log('Connected players updated: ', this.connectedPlayers);
            }
        });

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

    public addPlayerToSlot(index: number): void {
        this.lobbyService.joinPlayerSlot(index);
    }

    public addBot(index: number): void {
        this.lobbyService.addBotToSlot(index);
    }

    public allPlayersInLobby(): boolean {
        return this.playerInLobby.length != 4;
    }

    public startGame(): void {
        console.log("Start Game!");
    }
}
