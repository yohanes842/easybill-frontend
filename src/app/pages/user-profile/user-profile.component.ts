import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/app/state/app.state';
import {
  setChangeAccountNumberDialogDisplay,
  setChangePasswordDialogDisplay,
  setChangeUsernameDialogDisplay,
  setDialogDisplayAction,
} from 'src/app/state/dialogDisplay/dialogDisplay.actions';
import {
  getChangeAccountNumberDialogDisplay,
  getChangePasswordDialogDisplay,
  getChangeUsernameDialogDisplay,
} from 'src/app/state/dialogDisplay/dialogDisplay.selectors';

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
    private store: Store<Pick<AppState, 'currentSelected'>>
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
    this.store.dispatch(setChangeUsernameDialogDisplay({ display: true }));
    this.store.dispatch(
      setDialogDisplayAction({ action: setChangeUsernameDialogDisplay })
    );
  }

  showChangePasswordDialog() {
    this.store.dispatch(setChangePasswordDialogDisplay({ display: true }));
    this.store.dispatch(
      setDialogDisplayAction({ action: setChangePasswordDialogDisplay })
    );
  }

  showEditAccountNumberDialog() {
    this.store.dispatch(setChangeAccountNumberDialogDisplay({ display: true }));
    this.store.dispatch(
      setDialogDisplayAction({ action: setChangeAccountNumberDialogDisplay })
    );
  }
}
