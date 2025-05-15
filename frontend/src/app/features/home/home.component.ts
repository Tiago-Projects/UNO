import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LobbyService } from '../../core/Service/lobby.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    playerName: string = "";

    constructor(private lobbyService: LobbyService, private router: Router) {
        lobbyService.connect();
    }

    protected connectPlayer(): void {
        if (this.playerName.trim() == "") return;
        this.lobbyService.connectPlayer(this.playerName);
        this.router.navigate(['lobby']);
    }
}
