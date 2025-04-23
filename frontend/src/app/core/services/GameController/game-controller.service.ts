import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Card } from '../../module/card/class/card';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class GameControllerService {
    private http = inject(HttpClient);

    constructor() { }

    getDeck(): Observable<Card[]> {
        return this.http.get<{ allDeck: any[] }>("http://localhost:8080/api/get-deck")
            .pipe(
                map(response => response.allDeck.map(obj => new Card(obj.suit, obj.type)))
            );
    }

    startGame(): Observable<any> {
        return this.http.get("http://localhost:8080/api/start-game")
            .pipe(
                map(response => response)
            );
    }

    getCardFromDeck(): Observable<any> {
        return this.http.post("http://localhost:8080/api/get-card-from-deck", {})
            .pipe(
                map(response => response)
            );
    }
}
