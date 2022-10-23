import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';
import { Route } from 'src/app/enums/Route';
import { Severity } from 'src/app/enums/Severity';
import { CommonService } from 'src/app/services/common/common.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService],
})
export class OrderListComponent implements OnInit {
  display: boolean = false;

  currentUser!: User;
  orders!: OrderHeader[];
  relevantOrders!: OrderHeader[];
  usersOrders!: OrderHeader[];

  selectedOrder!: OrderHeader;

  constructor(
    private orderService: OrderService,
    private commonService: CommonService,
    private messageService: CustomMessageService,
    private router: Router
  ) {
    this.commonService.changePageTitle(Route.HOME_PATH);
  }

  ngOnInit() {
    this.getRelevantOrders();
    this.getUsersOrders();
  }

  showDetail(selectedOrder: OrderHeader): void{
    this.selectedOrder = selectedOrder;
    this.display = true;
  }

  hideDetail(): void {
    this.display = false;
  }

  getRelevantOrders(): void{
    this.orderService.getRelevantOrders().subscribe(
      (res: any) => {
        this.currentUser = res.output.data;
        this.relevantOrders = this.currentUser.order_list as OrderHeader[];
        this.orders = this.relevantOrders;
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

  getUsersOrders(): void{
    this.orderService.getUsersOrders().subscribe(
      (res: any) => {
        this.currentUser = res.output.data;
        this.usersOrders = this.currentUser.order_list as OrderHeader[];
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

  changeDataViewContent(isRelevantOrder: boolean): void{
    this.orders = (isRelevantOrder) ? this.relevantOrders : this.usersOrders;
  }
}
