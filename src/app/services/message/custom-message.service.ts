import { Injectable } from '@angular/core';
import { sum } from 'lodash';
import { MessageService } from 'primeng/api';
import { Severity } from 'src/app/enums/Severity';

interface Message {
  severity: string;
  summary: string;
  detail: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomMessageService {
  timeOutId: NodeJS.Timeout;
  constructor(private messageService: MessageService) {}

  showMessage(severity: Severity, summary: string, detail: string) {
    const newMessage: Message = {
      severity: severity,
      summary: summary,
      detail: detail,
    };

    this.messageService.clear();
    this.messageService.add(newMessage);

    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => this.messageService.clear(), 5000);
  }
}
