import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { OrderHeader } from 'src/app/classes/order-header';
import { Route } from 'src/app/enums/Route';
import { Severity } from 'src/app/enums/Severity';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';
import { AppState } from 'src/app/state/app.state';
import { setSelectedOrder } from 'src/app/state/currentSelected/currentSelected.actions';
import {
  setDetailOrderDialogDisplay,
  setDialogDisplayAction,
} from 'src/app/state/dialogDisplay/dialogDisplay.actions';

@Component({
  selector: 'order-list-content',
  templateUrl: './order-list-content.component.html',
  styleUrls: ['./order-list-content.component.css'],
})
export class OrderListContentComponent implements OnInit {
  @Input() order!: OrderHeader;
  @Input() withDeleteButton: boolean;
  @Output() onShowDetail: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<OrderHeader> = new EventEmitter();

  selectedOrder!: OrderHeader;

  constructor(
    private orderService: OrderService,
    private messageService: CustomMessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private datePipe: DatePipe,
    private authService: AuthService,
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
      });
      return;
    }

    this.store.dispatch(setSelectedOrder({ order: order }));
    this.store.dispatch(setDetailOrderDialogDisplay({ display: true }));
    this.store.dispatch(
      setDialogDisplayAction({ action: setDetailOrderDialogDisplay })
    );
  }

  reOrder(event: Event, order: OrderHeader) {
    event.stopPropagation();
    this.orderService.reOrder(order.id!).subscribe((res) => {
      const orderObject = res.output.data;

      this.authService
        .getAuthUser()
        .subscribe((user) => (orderObject.username = user.username));

      orderObject.order_at = this.datePipe.transform(
        new Date(),
        'yyyy-MM-dd HH:mm:ss'
      )!;
      orderObject.order_list.forEach((orderList) => (orderList.users = []));
      localStorage.setItem('currentOrder', JSON.stringify(orderObject));

      this.router.navigateByUrl(Route.ADD_ORDER_PATH);
    });
  }

  deleteOrder(event: Event, order: OrderHeader) {
    event.stopPropagation();
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this order?',
      accept: () => {
        this.orderService.deleteOrder(this.order.id!).subscribe(() => {
          this.messageService.showMessage(
            Severity.SUCCESS,
            '',
            'Successfully deleted order'
          );
          this.onDelete.emit(this.order);
        });
      },
    });
  }
}
