import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LobbyService } from '../../core/Service/lobby.service';
import { PlayerSlotComponent } from '../player-slot/player-slot.component';
import { PlayerEntity } from '../../core/Model/player-entity';


@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [FormsModule, CommonModule, PlayerSlotComponent],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {
    slotCount:number = 4;
    players: (PlayerEntity | null)[] = [new PlayerEntity("Player1"), null, null, null];

    constructor(private lobbyService: LobbyService) {
        this.lobbyService.connect();
    }  
}
