import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderHeader } from 'src/app/classes/order-header';
import { Status } from 'src/app/classes/status';
import { User } from 'src/app/classes/user';
import { Route } from 'src/app/enums/Route';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'relevant-order-detail-content',
  templateUrl: './relevant-order-detail-content.component.html',
  styleUrls: ['./relevant-order-detail-content.component.css'],
})
export class RelevantOrderDetailContentComponent implements OnInit {
  @Input() selectedOrder!: OrderHeader;
  @Input() selectedUser!: User; // User yang ordernya akan ditampilkan

  currentUser!: User;
  currentRoute!: string;
  billRoute!: string;

  userStatus!: Status;
  othersStatus: Status[] = [];

  constructor(private router: Router, private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser() as User;
    this.currentRoute = this.router.url;
    this.billRoute = Route.BILL_PATH;
  }

  ngOnInit(): void {
    this.selectedUser = this.selectedOrder.order_detail_group_by_user.find(
      (user: User) => user.id === this.selectedUser?.id
    )!;

    this.selectedOrder.bills.forEach((bill) => {
      if (bill.user.id === this.selectedUser.id) this.userStatus = bill;
      else this.othersStatus.push(bill);
    });
  }

  navigateToBillPage() {
    this.router.navigateByUrl(Route.BILL_PATH);
  }
}
