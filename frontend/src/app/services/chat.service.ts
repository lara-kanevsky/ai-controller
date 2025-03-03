import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model'; // assuming this is your model

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://localhost:5186/chat'; // The REST API base URL

  constructor(private http: HttpClient) {}

  // Get all chat messages
  getAllChats(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(this.apiUrl);
  }

  // Get a single chat message by id
  getChatById(id: number): Observable<ChatMessage> {
    return this.http.get<ChatMessage>(`${this.apiUrl}/${id}`);
  }

  // Create a new chat message
  createChatMessage(chatMessage: ChatMessage): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(this.apiUrl, chatMessage, this.getHttpOptions());
  }

  // Update an existing chat message
  updateChatMessage(id: number, chatMessage: ChatMessage): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, chatMessage, this.getHttpOptions());
  }

  // Delete a chat message by id
  deleteChatMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Helper method to set HTTP headers for POST and PUT requests
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
}
