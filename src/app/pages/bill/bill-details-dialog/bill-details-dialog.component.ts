import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderHeader } from 'src/app/classes/order-header';
import { Status } from 'src/app/classes/status';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'bill-details-dialog',
  templateUrl: './bill-details-dialog.component.html',
  styleUrls: ['./bill-details-dialog.component.css'],
})
export class BillDetailsDialogComponent implements OnInit {
  @Input() dialogDisplay!: boolean;
  @Output() dialogDisplayChange: EventEmitter<boolean> = new EventEmitter();
  @Input() selectedBill!: Status;
  @Input() isPayable!: boolean;

  currentUser!: User;
  display: boolean = true;
  selectedOrder!: OrderHeader;
  isDetailSection: boolean = false;

  constructor(
    private orderService: OrderService,
    private messageService: CustomMessageService,
    private authService: AuthService
  ) {
    this.authService
      .getAuthUser()
      .subscribe((user) => (this.currentUser = user));
  }

  ngOnInit(): void {}

  showDetail(order: OrderHeader): void {
    this.selectedOrder = this.orderService.getViewedOrder(order.id!)!;

    if (this.selectedOrder) this.isDetailSection = true;
    else {
      this.orderService.getOrder(order.id!).subscribe(
        (res: any) => {
          this.selectedOrder = res.output.data;
          this.orderService.setViewedOrder(
            this.selectedOrder.id!,
            this.selectedOrder
          );
          this.isDetailSection = true;
        },
        (error: HttpErrorResponse) => {
          this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
        }
      );
    }
  }

  backToRelatedOrders(): void {
    this.isDetailSection = false;
  }

  displayChange(): void {
    this.isDetailSection = false;
    this.dialogDisplayChange.emit(this.dialogDisplay);
  }
}
