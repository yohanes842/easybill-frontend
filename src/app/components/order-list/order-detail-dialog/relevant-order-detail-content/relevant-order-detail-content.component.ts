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

  currentUser!: User | null;
  user!: User; //user yang sedang login
  yourStatus!: Status;
  othersStatus: Status[] = [];

  constructor(private router: Router, private authService: AuthService) {
    this.currentUser = authService.getCurrentUser();
  }

  ngOnInit(): void {
    console.log(this.selectedOrder);
    this.user = this.selectedOrder.order_detail_group_by_user.find(
      (user: User) => user.id === this.currentUser?.id
    )!;

    this.selectedOrder.bills.forEach((bill) => {
      if (bill.user.id === this.currentUser?.id) this.yourStatus = bill;
      else this.othersStatus.push(bill);
    });
  }

  navigateToBillPage() {
    this.router.navigateByUrl(Route.BILL_PATH);
  }
}
