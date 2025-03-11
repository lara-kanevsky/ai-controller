import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ai } from '../models/ai.model';
import { NewAi } from '../models/new-ai.model';

@Injectable({
    providedIn: 'root',
})
export class AiApiService {
    private apiUrl = 'https://localhost:7214/ai';

    constructor(private http: HttpClient) {}

    getAllAis(): Observable<Ai[]> {
        return this.http.get<Ai[]>(this.apiUrl);
    }

    getAiById(id: number): Observable<Ai> {
        return this.http.get<Ai>(`${this.apiUrl}/${id}`);
    }

    createAi(
        ai: NewAi,
    ): Observable<Ai> {
        return this.http.post<Ai>(
            this.apiUrl,
            ai,
            this.getHttpOptions(),
        );
    }

    updateAi(
        id: number,
        chatMessage: Ai,
    ): Observable<void> {
        return this.http.put<void>(
            `${this.apiUrl}/${id}`,
            chatMessage,
            this.getHttpOptions(),
        );
    }

    deleteAi(id: number): Observable<Ai> {
        return this.http.delete<Ai>(`${this.apiUrl}/${id}`);
    }

    private getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
    }
}
