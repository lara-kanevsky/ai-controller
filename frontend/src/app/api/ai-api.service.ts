import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ai } from '../models/ai.model';

@Injectable({
    providedIn: 'root',
})
export class AiApiService {
    private apiUrl = 'https://localhost:7214/ai';

    constructor(private http: HttpClient) {}

    getAllApis(): Observable<Ai[]> {
        return this.http.get<Ai[]>(this.apiUrl);
    }

    getChatById(id: number): Observable<Ai> {
        return this.http.get<Ai>(`${this.apiUrl}/${id}`);
    }

    createChatMessage(
        chatMessage: Ai,
    ): Observable<Ai> {
        return this.http.post<Ai>(
            this.apiUrl,
            chatMessage,
            this.getHttpOptions(),
        );
    }

    updateChatMessage(
        id: number,
        chatMessage: Ai,
    ): Observable<void> {
        return this.http.put<void>(
            `${this.apiUrl}/${id}`,
            chatMessage,
            this.getHttpOptions(),
        );
    }

    deleteChatMessage(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    private getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
    }
}
