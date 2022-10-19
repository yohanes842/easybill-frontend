import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderHeader } from 'src/app/classes/order-header';
import { Status } from 'src/app/classes/status';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'dialog-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() selectedOrder!: OrderHeader;
  @Input() isRelevantOrder!: boolean;
  @Output() close: EventEmitter<any> = new EventEmitter();

  currentUser!: User | null;
  user!: User; //user yang sedang login
  yourStatus!: Status;
  othersStatus: Status[] = [];

  display: boolean = true;

  constructor(private authService: AuthService) {
    this.currentUser = authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.user = this.selectedOrder.order_detail_group_by_user.find(
      (user: User) => user.id === this.currentUser?.id
    )!;

    this.selectedOrder.status.forEach((status) => {
      if(status.user.id === this.currentUser?.id) this.yourStatus = status;
      else this.othersStatus.push(status);
    });

    console.log(this.yourStatus);
    console.log(this.othersStatus);
  }

  onHideDetail(): void {
    this.close.emit(null);
  }
}
