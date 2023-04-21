import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { OrderHeader } from 'src/app/classes/order-header';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';
import { AppState } from 'src/app/state/app.state';
import { setSelectedOrder } from 'src/app/state/currentSelected/currentSelected.actions';
import {
  setDetailOrderDialogDisplay,
  setDialogDisplayAction,
} from 'src/app/state/dialogDisplay/dialogDisplay.actions';

@Component({
  selector: 'pending-order-list-content',
  templateUrl: './pending-order-list-content.component.html',
  styleUrls: ['./pending-order-list-content.component.css'],
})
export class PendingOrderListContentComponent implements OnInit {
  @Input() order!: OrderHeader;
  @Output() onDeleted: EventEmitter<OrderHeader> = new EventEmitter();
  @Output() onApproved: EventEmitter<OrderHeader> = new EventEmitter();

  constructor(
    private orderService: OrderService,
    private messageService: CustomMessageService,
    private confirmationService: ConfirmationService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  showDetail(order: OrderHeader) {
    let selectedOrder = this.orderService.getViewedOrder(order.id!)!;

    if (selectedOrder) {
      this.store.dispatch(setSelectedOrder({ order: selectedOrder }));
      this.store.dispatch(setDetailOrderDialogDisplay({ display: true }));
      this.store.dispatch(
        setDialogDisplayAction({ action: setDetailOrderDialogDisplay })
      );
    } else {
      this.orderService.getOrder(order.id!).subscribe({
        next: (res) => {
          selectedOrder = res.output.data;
          this.orderService.setViewedOrder(selectedOrder.id!, selectedOrder);

          this.store.dispatch(setSelectedOrder({ order: selectedOrder }));
          this.store.dispatch(setDetailOrderDialogDisplay({ display: true }));
          this.store.dispatch(
            setDialogDisplayAction({ action: setDetailOrderDialogDisplay })
          );
        },
      });
    }
  }

  showApproveConfirmation(event: Event) {
    event.stopPropagation();
    this.confirmationService.confirm({
      message: 'Are you sure that you want to approve this order?',
      accept: () => {
        this.orderService.approveOrder(this.order.id!).subscribe(() => {
          this.messageService.showMessage(
            Severity.SUCCESS,
            '',
            'Successfully approved "' + this.order.order_description + '"'
          );
          this.onApproved.emit(this.order);
        });
      },
    });
  }

  showDeleteConfirmation(event: Event) {
    event.stopPropagation();
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this order?',
      accept: () => {
        this.orderService.deleteOrder(this.order.id!).subscribe(() => {
          this.messageService.showMessage(
            Severity.SUCCESS,
            '',
            'Successfully rejected "' + this.order.order_description + '"'
          );
          this.onDeleted.emit(this.order);
        });
      },
    });
  }
}
