import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RelatedOrder } from 'src/app/classes/related-order';
import { Transaction } from 'src/app/classes/transaction';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { AuthService } from 'src/app/services/auth/auth.service';
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
  @Input() relatedOrder: RelatedOrder;
  selectedTransaction: Transaction;
  authUser: User;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private messageService: CustomMessageService,
    private store: Store<AppState>
  ) {
    this.store
      .select(getSelectedTransaction)
      .subscribe((res) => (this.selectedTransaction = res));
    this.authService.getAuthUser().subscribe((res) => (this.authUser = res));
  }

  ngOnInit() {}

  showDetail(orderId: number) {
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
    this.store.dispatch(setDetailOrderDialogDisplay({ display: true }));
  }
}
