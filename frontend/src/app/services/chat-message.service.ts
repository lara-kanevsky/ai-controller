// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { ShowChatMessage } from '../models/show-chat-message.model'; // assuming this is your model
// import { NewChatMessage } from '../models/new-chat-message.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class ChatService {
//   private apiUrl = 'https://localhost:7214/chatmessage'; // The REST API base URL

//   constructor(private http: HttpClient) {}

//   // Get all chat messages
//   getAllChats(): Observable<ShowChatMessage[]> {
//     return this.http.get<ShowChatMessage[]>(this.apiUrl);
//   }

//   // Get a single chat message by id
//   getChatById(id: number): Observable<ShowChatMessage> {
//     return this.http.get<ShowChatMessage>(`${this.apiUrl}/${id}`);
//   }

//   // Create a new chat message
//   createChatMessage(chatMessage: NewChatMessage): Observable<ShowChatMessage> {
//     return this.http.post<ShowChatMessage>(this.apiUrl, chatMessage, this.getHttpOptions());
//   }

//   // Update an existing chat message
//   updateChatMessage(id: number, chatMessage: ShowChatMessage): Observable<void> {
//     return this.http.put<void>(`${this.apiUrl}/${id}`, chatMessage, this.getHttpOptions());
//   }

//   // Delete a chat message by id
//   deleteChatMessage(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }

//   // Helper method to set HTTP headers for POST and PUT requests
//   private getHttpOptions() {
//     return {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//       }),
//     };
//   }
// }
