import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderHeader } from 'src/app/classes/order-header';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';
import { AppState } from 'src/app/state/app.state';
import { setSelectedOrder } from 'src/app/state/currentSelected/currentSelected.actions';
import { setDetailOrderDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.actions';

@Component({
  selector: 'bill-related-order-content',
  templateUrl: './bill-related-order-content.component.html',
  styleUrls: ['./bill-related-order-content.component.css'],
})
export class BillRelatedOrderContentComponent implements OnInit {
  @Input() order: OrderHeader;

  constructor(
    private orderService: OrderService,
    private messageService: CustomMessageService,
    private store: Store<AppState>
  ) {}

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
          this.messageService.showMessage(Severity.ERROR, '', 'REQUEST '),
      });
      return;
    }
    this.store.dispatch(setSelectedOrder({ order: order }));
    this.store.dispatch(setDetailOrderDialogDisplay({ display: true }));
  }
}
