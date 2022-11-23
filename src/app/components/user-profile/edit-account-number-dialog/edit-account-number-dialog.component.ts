import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConnectableObservable } from 'rxjs';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';

@Component({
  selector: 'edit-account-number-dialog',
  templateUrl: './edit-account-number-dialog.component.html',
  styleUrls: ['./edit-account-number-dialog.component.css'],
})
export class EditAccountNumberDialogComponent implements OnInit {
  @Input() currentAccountNumber!: string;

  @Output() onClose: EventEmitter<void> = new EventEmitter();

  display: boolean = true;

  passwordString!: string;
  newAccountNumber!: string;

  constructor(private messageService: CustomMessageService) {}

  ngOnInit(): void {
    console.log(this.currentAccountNumber);
    if (!this.currentAccountNumber)
      this.currentAccountNumber = 'Not set up yet';
  }

  hideDialog(): void {
    this.onClose.emit();
  }

  submit(): void {
    if (this.currentAccountNumber == this.newAccountNumber) {
      this.messageService.showMessage(
        Severity.ERROR,
        'INPUT ERROR',
        'Account number must be different with the old one!'
      );
    } else {
      console.log('submit');
    }
  }
}
