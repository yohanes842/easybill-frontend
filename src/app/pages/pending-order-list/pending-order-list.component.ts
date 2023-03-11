import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';
import { Route } from 'src/app/enums/Route';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-pending-order-list',
  templateUrl: './pending-order-list.component.html',
  styleUrls: ['./pending-order-list.component.css'],
})
export class PendingOrderListComponent implements OnInit {
  display: boolean = false;
  isFetching: boolean = false;

  currentUser!: User;
  selectedOrder!: OrderHeader;
  pendingOrders!: OrderHeader[];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.orderService.getPendingOrders().subscribe((res) => {
      this.pendingOrders = res.output.data.pending_orders!;
    });
  }

  showDetail(selectedOrder: OrderHeader) {
    this.selectedOrder = selectedOrder;
    this.display = true;
  }

  hideDetail() {
    this.display = false;
  }

  removeOrder(order: OrderHeader) {
    let index = this.pendingOrders.indexOf(order);
    this.pendingOrders.splice(index, 1);
  }

  approveOrder(order: OrderHeader) {
    this.removeOrder(order);
    this.router.navigateByUrl(Route.HOME_PATH);
  }
}
