import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AiService } from '../../services/ai.service';
import { Ai } from '../../models/ai.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-table',
  imports:[CommonModule],
  template: `
    <h2>AI Table</h2>
    <button (click)="addRandomAi()">Add Random AI</button>

    <ul>
      <li *ngFor="let ai of ais()">
        {{ ai.model }}
        <button (click)="removeAi(ai)">Remove</button>
      </li>
    </ul>
  `,
})
export class AiTableComponent {
  // Convert Observable to Signal for better performance
  ais = toSignal(this.aiService.ais$, { initialValue: [] });

  constructor(private aiService: AiService) {}

  addRandomAi() {
    const newAi: Ai = { id: Math.random(), model: 'AI-' + Date.now(),url:"urlsito" };
    this.aiService.addAi(newAi);
  }

  removeAi(ai: Ai) {
    this.aiService.removeAi(ai);
  }
}
