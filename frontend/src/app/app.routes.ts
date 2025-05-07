import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LobbyComponent } from './features/lobby/lobby.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'lobby', component: LobbyComponent },
];
