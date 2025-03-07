import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowChatMessage } from '../models/show-chat-message.model';
import { NewChatMessage } from '../models/new-chat-message.model';


@Injectable({
  providedIn: 'root',
})
export class ChatApiService {
  private apiUrl = 'https://localhost:7214/chatmessage';

  constructor(private http: HttpClient) {}

  getAllChats(): Observable<ShowChatMessage[]> {
    return this.http.get<ShowChatMessage[]>(this.apiUrl);
  }

  getChatById(id: number): Observable<ShowChatMessage> {
    return this.http.get<ShowChatMessage>(`${this.apiUrl}/${id}`);
  }

  createChatMessage(chatMessage: NewChatMessage): Observable<ShowChatMessage> {
    return this.http.post<ShowChatMessage>(this.apiUrl, chatMessage, this.getHttpOptions());
  }

  updateChatMessage(id: number, chatMessage: ShowChatMessage): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, chatMessage, this.getHttpOptions());
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
