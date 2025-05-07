import { Component } from '@angular/core';
import { Player } from '../../core/models/Player/player';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LobbyService } from '../../core/services/lobby-service.service';


@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {
    players!: Player[];

    constructor(private lobbyService: LobbyService) {
        this.lobbyService.connect();

        this.lobbyService.isConnected$.subscribe((connected) => {
            if (connected) {
                this.lobbyService.getConnectedPlayers();
                this.lobbyService.getPlayersInLobby();
            }
        });

        this.lobbyService.players$.subscribe((players) => {
            if (players) {
                this.players = players;
                console.log('Players updated: ', this.players);
            }
        });
    }   
}
