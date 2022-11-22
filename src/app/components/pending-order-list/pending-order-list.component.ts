import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadPaging } from 'src/app/classes/lazy-load-paging';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';
import { Route } from 'src/app/enums/Route';
import { Response } from 'src/app/interfaces/response';
import { LazyLoadService } from 'src/app/services/lazy-load/lazy-load.service';
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

  ngOnInit(): void {
    this.loadData();
  }

  showDetail(selectedOrder: OrderHeader): void {
    this.selectedOrder = selectedOrder;
    this.display = true;
  }

  hideDetail(): void {
    this.display = false;
  }

  removeOrder(order: OrderHeader): void {
    let index = this.pendingOrders.indexOf(order);
    this.pendingOrders.splice(index, 1);
  }

  approveOrder(order: OrderHeader): void {
    this.removeOrder(order);
    this.router.navigateByUrl(Route.HOME_PATH);
  }

  loadData(): void {
    this.orderService.getPendingOrders().subscribe((res: Response<User>) => {
      this.pendingOrders = res.output.data.pending_orders!;
    });
  }
}
