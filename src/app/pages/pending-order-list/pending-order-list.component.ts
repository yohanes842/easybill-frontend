import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';
import { Route } from 'src/app/enums/Route';
import { OrderService } from 'src/app/services/order/order.service';
import { AppState } from 'src/app/state/app.state';
import { setDetailOrderDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.actions';
import { getDetailOrderDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.selectors';

@Component({
  selector: 'app-pending-order-list',
  templateUrl: './pending-order-list.component.html',
  styleUrls: ['./pending-order-list.component.css'],
})
export class PendingOrderListComponent implements OnInit {
  dialogDisplay: Observable<boolean>;

  currentUser: User;
  selectedOrder: OrderHeader;
  pendingOrders: OrderHeader[];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private store: Store<Pick<AppState, 'currentSelected'>>
  ) {
    this.orderService
      .getPendingOrders()
      .subscribe(
        (res) => (this.pendingOrders = res.output.data.pending_orders!)
      );

    this.dialogDisplay = this.store.select(getDetailOrderDialogDisplay);
  }

  ngOnInit() {
    this.store.dispatch(setDetailOrderDialogDisplay({ display: false }));
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
