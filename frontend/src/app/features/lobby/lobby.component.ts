import { Component } from '@angular/core';
import { Player } from '../../core/models/Player/player';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css'
})
export class LobbyComponent {
    playerName: string = "";
    playersInRoom: Player[] = [];

    constructor() {
    }
}
