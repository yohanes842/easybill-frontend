import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/constant/Route';
import { Severity } from 'src/app/constant/Severity';
import { OrderHeader } from 'src/app/interfaces/order-header';
import { User } from 'src/app/interfaces/user';
import { CommonService } from 'src/app/services/common.service';
import { CustomMessageService } from 'src/app/services/custom-message.service';
import { OrderService } from 'src/app/services/order.service';

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
    private messageService: CustomMessageService
  ) {}

  ngOnInit() {
    this.commonService.changePageTitle(Route.HOME_PATH);

    this.orderService.getUserOrders(1).subscribe(
      (res: any) => {
        this.currentUser = res.output.data;
        this.orders = this.currentUser.order_list as OrderHeader[];
      },
      (error: HttpErrorResponse) => {
        this.messageService.showMessage(Severity.ERROR, 'Request Error');
      }
    );
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  onShowDetail(order: OrderHeader) {
    this.orderService.getOrder(order.id!).subscribe(
      (res: any) => {
        this.selectedOrder = res.output.data;
        this.selectedOrder.discount *= 100;
        this.display = true;
      },
      (error: HttpErrorResponse) => {
        this.messageService.showMessage(Severity.ERROR, 'Request Error');
      }
    );
  }

  onHideDetail(): void {
    this.display = false;
  }
}
