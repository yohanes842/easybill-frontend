import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';

@Component({
  selector: 'change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  display: boolean = true;

  currentUser!: User;
  currentPasswordString: String = '';
  newPasswordString: String = '';
  confirmPasswordString: String = '';

  constructor(private messageService: CustomMessageService) { }

  ngOnInit(): void {
  }

  hideDialog(): void{
    this.onClose.emit();
  }

  submit(): void{
    if(this.newPasswordString != this.confirmPasswordString) {
      this.messageService.showMessage(Severity.ERROR, 'INPUT ERROR', 'Password and confirm password don\'t match');
    } else {
      console.log('submit');
    }
  }
}
