import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OrderHeader } from 'src/app/classes/order-header';
import { Status } from 'src/app/classes/status';
import { User } from 'src/app/classes/user';
import { Route } from 'src/app/enums/Route';
import { Severity } from 'src/app/enums/Severity';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { AppState } from 'src/app/state/app.state';
import { setSelectedUser } from 'src/app/state/currentSelected/currentSelected.actions';
import {
  getSelectedOrder,
  getSelectedUser,
} from 'src/app/state/currentSelected/currentSelected.selectors';

@Component({
  selector: 'relevant-order-detail-content',
  templateUrl: './relevant-order-detail-content.component.html',
  styleUrls: ['./relevant-order-detail-content.component.css'],
})
export class RelevantOrderDetailContentComponent implements OnInit {
  @Input() selectedOrder: OrderHeader;
  @Input() selectedUser: User; // User yang ordernya akan ditampilkan

  currentUser: User;
  currentRoute: string;
  billRoute: string;

  userStatus: Status;
  othersStatus: Status[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: CustomMessageService,
    private store: Store<Pick<AppState, 'dialogDisplay'>>
  ) {
    this.store
      .select(getSelectedOrder)
      .subscribe((res) => (this.selectedOrder = res));
    this.store
      .select(getSelectedUser)
      .subscribe((res) => (this.selectedUser = res));

    this.authService
      .getAuthUser()
      .subscribe((user) => (this.currentUser = user));
    this.currentRoute = this.router.url;
    this.billRoute = Route.BILL_PATH;
  }

  ngOnInit() {
    const completeAttUser = this.selectedOrder.order_detail_group_by_user.find(
      (user) => user.id === this.selectedUser.id
    );

    if (!completeAttUser) {
      this.messageService.showMessage(
        Severity.ERROR,
        'REQUEST ERROR',
        'User not found!'
      );
      return;
    }

    this.selectedUser = completeAttUser; // Tidak perlu disimpan ke dalam state karena hanya dipakai dalam komponen ini saja

    this.selectedOrder.bills.forEach((bill) => {
      if (bill.user.id === this.selectedUser.id) this.userStatus = bill;
      else this.othersStatus.push(bill);
    });
  }

  navigateToBillPage() {
    this.router.navigateByUrl(Route.BILL_PATH);
  }
}
