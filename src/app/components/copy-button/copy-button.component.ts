import { Component, Input, OnInit } from '@angular/core';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';

@Component({
  selector: 'copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.css'],
})
export class CopyButtonComponent implements OnInit {
  @Input() stringToBeCopy!: string | null;

  constructor(private messageService: CustomMessageService) {}

  ngOnInit() {}

  copy() {
    if (this.stringToBeCopy) {
      navigator.clipboard.writeText(this.stringToBeCopy);
      this.messageService.showMessage(Severity.SUCCESS, '', 'Success copied');
    }
  }
}
