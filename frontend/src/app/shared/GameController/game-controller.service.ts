import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class GameControllerService {
    private http = inject(HttpClient);

    constructor() { }

    getCard(): void {
        console.log("Hello world");
        this.http.get("http://localhost:8080/api/get-card").subscribe(
            data => console.log(data)
        );
    }
}
