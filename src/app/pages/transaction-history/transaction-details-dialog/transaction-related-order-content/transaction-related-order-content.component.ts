import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { relatedOrder } from 'src/app/classes/related-order';
import { Transaction } from 'src/app/classes/transaction';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';
import { AppState } from 'src/app/state/app.state';
import {
  setSelectedOrder,
  setSelectedUser,
} from 'src/app/state/currentSelected/currentSelected.actions';
import { getSelectedTransaction } from 'src/app/state/currentSelected/currentSelected.selectors';
import { setDetailOrderDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.actions';

@Component({
  selector: 'transaction-related-order-content',
  templateUrl: './transaction-related-order-content.component.html',
  styleUrls: ['./transaction-related-order-content.component.css'],
})
export class TransactionRelatedOrderContentComponent implements OnInit {
  @Input() relatedOrder: relatedOrder;
  selectedTransaction: Transaction;

  constructor(
    private orderService: OrderService,
    private messageService: CustomMessageService,
    private store: Store<AppState>
  ) {
    this.store
      .select(getSelectedTransaction)
      .subscribe((res) => (this.selectedTransaction = res));
  }

  ngOnInit() {}

  showDetail(orderId: number): void {
    let order = this.orderService.getViewedOrder(orderId)!;

    if (!order) {
      this.orderService.getOrder(orderId).subscribe({
        next: (res) => {
          order = res.output.data;
          this.orderService.setViewedOrder(orderId, order);
          this.showDetail(orderId);
        },
        error: () =>
          this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR'),
      });
      return;
    }
    this.store.dispatch(setSelectedOrder({ order: order }));
    this.store.dispatch(
      setSelectedUser({ user: this.selectedTransaction.payer })
    );
    this.store.dispatch(setDetailOrderDialogDisplay({ display: true }));
  }
}
