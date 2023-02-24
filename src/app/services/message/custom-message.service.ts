import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Severity } from 'src/app/enums/Severity';

@Injectable({
  providedIn: 'root',
})
export class CustomMessageService {
  constructor(private messageService: MessageService) {}

  showMessage(severity: Severity, summary: string, detail?: string): void {
    this.messageService.clear();
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
    setTimeout(() => this.messageService.clear(), 5000);
  }
}
