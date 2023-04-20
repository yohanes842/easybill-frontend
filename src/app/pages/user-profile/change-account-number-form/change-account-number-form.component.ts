import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomErrorResponse } from 'src/app/classes/error-response';
import { PaymentAccount } from 'src/app/classes/payment-account';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { UserService } from 'src/app/services/user/user.service';
import { AppState } from 'src/app/state/app.state';
import { setChangeAccountNumberDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.actions';

@Component({
  selector: 'change-account-number-form',
  templateUrl: './change-account-number-form.component.html',
  styleUrls: ['./change-account-number-form.component.css'],
})
export class ChangeAccountNumberFormComponent implements OnInit {
  authUser: User;

  passwordString: string;
  newAccountNumber: string;
  accountNumberRegex: RegExp = /[0-9]+/;
  errors: Map<string, string> = new Map();

  constructor(
    private messageService: CustomMessageService,
    private userService: UserService,
    private authService: AuthService,
    private store: Store<Pick<AppState, 'currentSelected'>>
  ) {
    // Get auth user profile
    this.authService.getAuthUser().subscribe((user) => {
      this.authUser = user;
    });
  }

  ngOnInit() {}

  submit() {
    console.log(this.newAccountNumber);
    // if (this.authUser.payment_account == this.newAccountNumber) {
    //   this.messageService.showMessage(
    //     Severity.ERROR,
    //     'INPUT ERROR',
    //     'Account number must be different with the old one!'
    //   );
    //   return;
    // }

    // .saveUserPaymentAccount(this.passwordString!, this.newAccountNumber!)
    this.userService
      .saveUserPaymentAccount(this.passwordString!, new PaymentAccount())
      .subscribe({
        next: () => {
          this.messageService.showMessage(
            Severity.SUCCESS,
            'CHANGE ACCOUNT NUMBER SUCCESS'
          );
          // this.authUser.payment_account = this.newAccountNumber;
          this.store.dispatch(
            setChangeAccountNumberDialogDisplay({ display: false })
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
