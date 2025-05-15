import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from './core/services/web-socket.service';
import { LobbyService } from './core/services/lobby-service.service';
import { filter, take } from 'rxjs';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

    title = 'UNO';

    constructor(
        private gameWebSocketController: WebSocketService,
        private lobbyService: LobbyService,
        private http: HttpClient,
        private router: Router
    ) {
        // Inject filters.svg
        this.injectGlobalSvgFilters();          

        // Connect WebSockets
        this.gameWebSocketController.connect();
        this.lobbyService.connect();

        // TODO: MAKE THIS WORK
        // Check if player is already in database
        this.lobbyService.checkPlayerStatus().subscribe((isConnected) => {
            const path = isConnected ? 'lobby' : 'home';
            this.router.navigate([path]);
        });
    }


    private injectGlobalSvgFilters(): void {
        this.http.get('assets/filters.svg', { responseType: 'text' }).subscribe((svgContent) => {
            const div = document.createElement('div');
            div.innerHTML = svgContent;
            document.body.insertBefore(div, document.body.firstChild);
        });
    }
}
