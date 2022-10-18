import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/enums/Route';
import { Severity } from 'src/app/enums/Severity';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';
import { CommonService } from 'src/app/services/common/common.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService],
})
export class OrderListComponent implements OnInit {
  display!: boolean;

  currentUser!: User;
  orders!: OrderHeader[];

  selectedOrder!: OrderHeader;

  constructor(
    private orderService: OrderService,
    private commonService: CommonService,
    private messageService: CustomMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.commonService.changePageTitle(Route.HOME_PATH);

    this.orderService.getUserOrders(1).subscribe(
      (res: any) => {
        this.currentUser = res.output.data;
        this.orders = this.currentUser.order_list as OrderHeader[];
      },
      (error: HttpErrorResponse) => {
        if (error.error.status.code == 'JWT_VERIFICATION_ERROR') {
          localStorage.clear();
          this.router.navigateByUrl(Route.LOGIN_PATH);
          this.messageService.showMessage(Severity.ERROR, 'VERIFICATION ERROR');
        } else {
          this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
        }
      }
    );
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  navigateToAddOrdersForm(): void {
    this.router.navigateByUrl(Route.ADD_ORDER_PATH);
  }

  onShowDetail(order: OrderHeader) {
    this.orderService.getOrder(order.id!).subscribe(
      (res: any) => {
        this.selectedOrder = res.output.data;
        this.selectedOrder.discount *= 100;
        this.display = true;
      },
      (error: HttpErrorResponse) => {
        this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
      }
    );
  }

  onHideDetail(): void {
    this.display = false;
  }
}
