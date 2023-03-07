import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Transaction } from 'src/app/classes/transaction';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/app/state/app.state';
import { setSelectedTransaction } from 'src/app/state/currentSelected/currentSelected.actions';
import {
  setDialogDisplayAction,
  setTransactionDetailsDialogDisplay,
} from 'src/app/state/dialogDisplay/dialogDisplay.actions';

@Component({
  selector: 'transaction-history-detail',
  templateUrl: './transaction-history-detail.component.html',
  styleUrls: ['./transaction-history-detail.component.css'],
})
export class TransactionHistoryDetailComponent implements OnInit {
  @Input() transaction!: Transaction;
  currentUserId: number;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.authService
      .getAuthUser()
      .subscribe((user) => (this.currentUserId = user.id));
  }

  ngOnInit() {}

  showDialog(transaction: Transaction) {
    this.store.dispatch(setSelectedTransaction({ transaction: transaction }));
    this.store.dispatch(setTransactionDetailsDialogDisplay({ display: true }));
    this.store.dispatch(
      setDialogDisplayAction({ action: setTransactionDetailsDialogDisplay })
    );
  }
}
