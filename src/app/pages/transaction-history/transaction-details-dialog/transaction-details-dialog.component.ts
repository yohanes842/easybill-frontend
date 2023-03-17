import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderHeader } from 'src/app/classes/order-header';
import { Transaction } from 'src/app/classes/transaction';
import { AppState } from 'src/app/state/app.state';
import {
  getSelectedOrder,
  getSelectedTransaction,
} from 'src/app/state/currentSelected/currentSelected.selectors';
import {
  setDetailOrderDialogDisplay,
  setTransactionDetailsDialogDisplay,
} from 'src/app/state/dialogDisplay/dialogDisplay.actions';
import { getDetailOrderDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.selectors';

@Component({
  selector: 'transaction-details-dialog',
  templateUrl: './transaction-details-dialog.component.html',
  styleUrls: ['./transaction-details-dialog.component.css'],
})
export class TransactionDetailsDialogComponent implements OnInit {
  selectedTransaction!: Transaction;

  selectedOrder!: OrderHeader;
  isDetailSection: boolean;

  constructor(private store: Store<AppState>) {
    this.store
      .select(getSelectedOrder)
      .subscribe((res) => (this.selectedOrder = res));
    this.store
      .select(getSelectedTransaction)
      .subscribe((res) => (this.selectedTransaction = res));
    this.store
      .select(getDetailOrderDialogDisplay)
      .subscribe((res) => (this.isDetailSection = res));
  }

  ngOnInit() {
    this.hideDetail();
  }

  hideDetail() {
    this.store.dispatch(setDetailOrderDialogDisplay({ display: false }));
  }
}
