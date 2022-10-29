import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';
import { Route } from 'src/app/enums/Route';
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
  relevantOrdersFiltered!: OrderHeader[];
  usersOrdersFiltered!: OrderHeader[];
  isRelevantOrder: boolean = true;

  selectedOrder!: OrderHeader;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    Promise.all([this.getRelevantOrders(), this.getUsersOrders()]).then(() =>
      this.changeStatusFilter('ALL')
    );
  }

  showDetail(selectedOrder: OrderHeader): void {
    this.selectedOrder = selectedOrder;
    this.display = true;
  }

  hideDetail(): void {
    this.display = false;
  }

  async getRelevantOrders(): Promise<void> {
    return new Promise((resolve) => {
      this.orderService.getRelevantOrders().subscribe((res: any) => {
        this.currentUser = res.output.data;
        this.relevantOrders = this.currentUser.order_list as OrderHeader[];
        this.orders = this.relevantOrders;
        resolve(undefined);
      });
    });
  }

  async getUsersOrders(): Promise<void> {
    return new Promise((resolve) => {
      this.orderService.getUsersOrders().subscribe((res: any) => {
        this.currentUser = res.output.data;
        this.usersOrders = this.currentUser.order_list as OrderHeader[];
        resolve(undefined);
      });
    });
  }

  changeDataViewContent(isRelevantOrder: boolean): void {
    this.isRelevantOrder = isRelevantOrder;
    this.orders = isRelevantOrder
      ? this.relevantOrdersFiltered
      : this.usersOrdersFiltered;
  }

  changeStatusFilter(selectedStatusOptions: string): void {
    if (selectedStatusOptions == 'ALL') {
      this.relevantOrdersFiltered = this.relevantOrders;
      this.usersOrdersFiltered = this.usersOrders;
      this.changeDataViewContent(this.isRelevantOrder);
      return;
    }

    this.relevantOrdersFiltered = this.relevantOrders.filter(
      (order) => order.order_header_status == selectedStatusOptions
    );
    this.usersOrdersFiltered = this.usersOrders.filter(
      (order) => order.order_header_status == selectedStatusOptions
    );

    this.changeDataViewContent(this.isRelevantOrder);
  }
}
