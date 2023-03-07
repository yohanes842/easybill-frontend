import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomErrorResponse } from 'src/app/classes/error-response';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { UserService } from 'src/app/services/user/user.service';
import { AppState } from 'src/app/state/app.state';
import { setChangePasswordDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.actions';

@Component({
  selector: 'change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css'],
})
export class ChangePasswordFormComponent implements OnInit {
  currentPasswordString: String = '';
  newPasswordString: String = '';
  confirmPasswordString: String = '';
  errors: Map<string, string> = new Map();

  constructor(
    private messageService: CustomMessageService,
    private userService: UserService,
    private store: Store<Pick<AppState, 'currentSelected'>>
  ) {}

  ngOnInit(): void {}

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
        .subscribe({
          next: () => {
            this.messageService.showMessage(
              Severity.SUCCESS,
              'CHANGE PASSWORD SUCCESS'
            );
            this.store.dispatch(
              setChangePasswordDialogDisplay({ display: false })
            );
          },
          error: (error: CustomErrorResponse) => {
            const res = error.extra_message.match(/[A-z ]+\[(.+)\]/);
            const content = res![1];

            this.errors.clear();
            content.split(',').forEach((s) => {
              const [key, value] = s.split(':');
              this.errors.set(key, value);
            });

            this.messageService.showMessage(
              Severity.ERROR,
              error.code.replace(/_/g, ' ')
            );
          },
        });
    }
  }
}
