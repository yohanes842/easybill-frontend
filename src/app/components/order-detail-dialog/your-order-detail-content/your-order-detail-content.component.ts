import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderHeader } from 'src/app/classes/order-header';
import { Status } from 'src/app/classes/status';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/app/state/app.state';
import { getSelectedOrder } from 'src/app/state/currentSelected/currentSelected.selectors';

@Component({
  selector: 'your-order-detail-content',
  templateUrl: './your-order-detail-content.component.html',
  styleUrls: ['./your-order-detail-content.component.css'],
})
export class YourRelevantOrderDetailContentComponent implements OnInit {
  @Input() selectedOrder!: OrderHeader;

  currentUser: User;
  yourStatus: Status;
  othersStatus: Status[] = [];

  constructor(
    private authService: AuthService,
    private store: Store<Pick<AppState, 'dialogDisplay'>>
  ) {
    this.authService
      .getAuthUser()
      .subscribe((user) => (this.currentUser = user));

    this.store
      .select(getSelectedOrder)
      .subscribe((res) => (this.selectedOrder = res));
  }

  ngOnInit() {
    this.selectedOrder.bills.forEach((bill) => {
      if (bill.user.id === this.currentUser.id) this.yourStatus = bill;
      else this.othersStatus.push(bill);
    });
  }
}
