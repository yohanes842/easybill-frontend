import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OrderHeader } from 'src/app/classes/order-header';
import { Route } from 'src/app/enums/Route';
import { Severity } from 'src/app/enums/Severity';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'order-list-content',
  templateUrl: './order-list-content.component.html',
  styleUrls: ['./order-list-content.component.css'],
})
export class OrderListContentComponent implements OnInit {
  @Input() order!: OrderHeader;
  @Output() onShowDetail: EventEmitter<any> = new EventEmitter();

  selectedOrder!: OrderHeader;

  constructor(
    private orderService: OrderService,
    private messageService: CustomMessageService,
    private router: Router,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  showDetail(order: OrderHeader) {
    this.selectedOrder = this.orderService.getViewedOrder(order.id!)!;

    if (this.selectedOrder) this.onShowDetail.emit(this.selectedOrder);
    else {
      this.orderService.getOrder(order.id!).subscribe(
        (res: any) => {
          this.selectedOrder = res.output.data;
          this.orderService.setViewedOrder(
            this.selectedOrder.id!,
            this.selectedOrder
          );

          this.onShowDetail.emit(this.selectedOrder);
        },
        (error: HttpErrorResponse) => {
          this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
        }
      );
    }
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
}
