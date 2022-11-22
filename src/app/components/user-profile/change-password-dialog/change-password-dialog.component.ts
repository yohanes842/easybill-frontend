import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomErrorResponse } from 'src/app/classes/error-response';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css'],
})
export class ChangePasswordDialogComponent implements OnInit {
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  display: boolean = true;

  currentUser!: User;
  currentPasswordString: String = '';
  newPasswordString: String = '';
  confirmPasswordString: String = '';
  errors: Map<string, string> = new Map();

  constructor(
    private messageService: CustomMessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  hideDialog(): void {
    this.onClose.emit();
  }

  submit(): void {
    if (this.newPasswordString != this.confirmPasswordString) {
      this.messageService.showMessage(
        Severity.ERROR,
        'INPUT ERROR',
        "Password and confirm password don't match"
      );
    } else {
      this.userService
        .changeUserPassword(
          this.currentPasswordString,
          this.newPasswordString,
          this.confirmPasswordString
        )
        .subscribe(
          () => {
            this.errors = new Map();
            this.messageService.showMessage(
              Severity.SUCCESS,
              'CHANGE PASSWORD SUCCESS'
            );
            this.hideDialog();
          },
          (error: CustomErrorResponse) => {
            const res = error.extra_message.match(/[A-z ]+\[(.+)\]/);
            const content = res![1];

            this.errors = new Map();
            content.split(',').forEach((s) => {
              const [key, value] = s.split(':');
              this.errors.set(key, value);
            });

            this.messageService.showMessage(Severity.ERROR, error.code.replace(/_/g, ' '));
          }
        );
    }
  }
}
