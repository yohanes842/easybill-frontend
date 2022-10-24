import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderHeader } from 'src/app/classes/order-header';
import { Status } from 'src/app/classes/status';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'dialog-order-details',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() selectedOrder!: OrderHeader;
  @Input() isRelevantOrder!: boolean;
  @Output() close: EventEmitter<any> = new EventEmitter();

  currentUser!: User;
  yourStatus!: Status;
  othersStatus: Status[] = [];

  display: boolean = true;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser() as User;
  }

  ngOnInit(): void {}

  onHideDetail(): void {
    this.close.emit(null);
  }
}
