import { Component, OnInit } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/user';
import { DialogDisplayState } from 'src/app/interfaces/dialogDisplayState';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  changeAccountNumberDialogDisplay,
  changePasswordDialogDisplay,
  changeUsernameDialogDisplay,
  Props,
} from 'src/app/state/dialogDisplay.actions';
import {
  getChangeAccountNumberDialogDisplay,
  getChangePasswordDialogDisplay,
  getChangeUsernameDialogDisplay,
} from 'src/app/state/dialogDisplay.selectors';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  authUser: User | undefined;

  changeUsernameDialogDisplay$: Observable<boolean>;
  changePasswordDialogDisplay$: Observable<boolean>;
  changeAccountNumberDialogDisplay$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<{
      dialogDisplay: DialogDisplayState;
    }>
  ) {
    // Get auth user profile
    this.authService.getAuthUser().subscribe((user) => {
      this.authUser = user;
      this.authUser.account_number =
        this.authUser.account_number ?? 'Not set up yet';
    });

    this.changeUsernameDialogDisplay$ = this.store.select(
      getChangeUsernameDialogDisplay
    );
    this.changePasswordDialogDisplay$ = this.store.select(
      getChangePasswordDialogDisplay
    );
    this.changeAccountNumberDialogDisplay$ = this.store.select(
      getChangeAccountNumberDialogDisplay
    );
  }

  ngOnInit() {}

  back() {
    history.back();
  }

  //Dialog utility function

  showChangeUsernameDialog() {
    this.store.dispatch(changeUsernameDialogDisplay({ display: true }));
  }

  showChangePasswordDialog() {
    this.store.dispatch(changePasswordDialogDisplay({ display: true }));
  }

  showEditAccountNumberDialog() {
    this.store.dispatch(changeAccountNumberDialogDisplay({ display: true }));
  }

  changeUsernameDialogDisplayAction(actionProbs: Props): Action {
    return changeUsernameDialogDisplay(actionProbs);
  }

  changePasswordDialogDisplayAction(actionProbs: Props): Action {
    return changePasswordDialogDisplay(actionProbs);
  }

  changeAccountNumberDialogDisplayAction(actionProbs: Props): Action {
    return changeAccountNumberDialogDisplay(actionProbs);
  }
}
