import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PaymentAccount } from 'src/app/classes/payment-account';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/app/state/app.state';
import {
  setChangePasswordDialogDisplay,
  setChangeUsernameDialogDisplay,
  setDialogDisplayAction,
  setPasswordConfirmationDialogDisplay,
} from 'src/app/state/dialogDisplay/dialogDisplay.actions';
import {
  getChangePasswordDialogDisplay,
  getChangeUsernameDialogDisplay,
  getPasswordConfirmationDialogDisplay,
} from 'src/app/state/dialogDisplay/dialogDisplay.selectors';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  authUser = new User();

  changeUsernameDialogDisplay$: Observable<boolean>;
  changePasswordDialogDisplay$: Observable<boolean>;
  passwordConfirmationDialogDisplay$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<Pick<AppState, 'currentSelected'>>
  ) {}

  ngOnInit() {
    // Get auth user profile
    this.authService.getAuthUser().subscribe((user) => {
      this.authUser = user;
    });

    this.changeUsernameDialogDisplay$ = this.store.select(
      getChangeUsernameDialogDisplay
    );
    this.changePasswordDialogDisplay$ = this.store.select(
      getChangePasswordDialogDisplay
    );
    this.passwordConfirmationDialogDisplay$ = this.store.select(
      getPasswordConfirmationDialogDisplay
    );
  }

  back() {
    history.back();
  }

  addPaymentAccountSlot() {
    this.authUser.payment_account_list.push(new PaymentAccount());
  }

  deletePaymentAccount(paymentAccount: PaymentAccount) {
    const deletedIndex = this.authUser.payment_account_list.findIndex(
      (acc) => acc === paymentAccount
    );
    this.authUser.payment_account_list.splice(deletedIndex, 1);
  }

  updateUserProfile(newUser: User) {
    this.authUser = newUser;
  }

  getUser() {
    this.authService.getAuthUser().subscribe((user) => (this.authUser = user));
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

  showPasswordConfirmationDialog() {
    this.store.dispatch(
      setPasswordConfirmationDialogDisplay({ display: true })
    );
    this.store.dispatch(
      setDialogDisplayAction({ action: setPasswordConfirmationDialogDisplay })
    );
  }
}
