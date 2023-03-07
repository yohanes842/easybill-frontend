import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomErrorResponse } from 'src/app/classes/error-response';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { UserService } from 'src/app/services/user/user.service';
import { AppState } from 'src/app/state/app.state';
import { setChangeUsernameDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.actions';

@Component({
  selector: 'change-username-form',
  templateUrl: './change-username-form.component.html',
  styleUrls: ['./change-username-form.component.css'],
})
export class ChangeUsernameFormComponent implements OnInit {
  authUser: User;

  currentPasswordString: string = '';
  newUsernameString: string = '';
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
      this.authUser.account_number =
        this.authUser.account_number ?? 'Not set up yet';
    });
  }

  ngOnInit() {}

  submit() {
    if (this.newUsernameString.length <= 0) {
      this.messageService.showMessage(
        Severity.ERROR,
        'INPUT ERROR',
        'Username must be filled'
      );

      return;
    } else if (this.newUsernameString == this.authUser.username) {
      this.messageService.showMessage(
        Severity.ERROR,
        'INPUT ERROR',
        'Username must be different'
      );

      return;
    }

    this.userService
      .changeUserUsername(this.currentPasswordString!, this.newUsernameString)
      .subscribe({
        next: () => {
          this.messageService.showMessage(
            Severity.SUCCESS,
            'CHANGE USERNAME SUCCESS'
          );
          this.authUser.username = this.newUsernameString.toLowerCase();
          this.store.dispatch(
            setChangeUsernameDialogDisplay({ display: false })
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
