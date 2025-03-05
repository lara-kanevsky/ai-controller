import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroqApiService {
  private apiUrl = 'https://api.groq.com/openai/v1/chat/completions'; // Groq API endpoint
  private apiKey = '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'; // Store in env files in production

  constructor(private http: HttpClient) {}

  generateResponse(prompt: string,model:string,url:string,key:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json'
    });

    const body = {
      model: model, // Change to the correct Groq model
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100
    };

    return this.http.post(url, body, { headers });
  }
}
