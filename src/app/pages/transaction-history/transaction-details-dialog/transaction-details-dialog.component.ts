import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderHeader } from 'src/app/classes/order-header';
import { Transaction } from 'src/app/classes/transaction';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'transaction-details-dialog',
  templateUrl: './transaction-details-dialog.component.html',
  styleUrls: ['./transaction-details-dialog.component.css'],
})
export class TransactionDetailsDialogComponent implements OnInit {
  @Input() dialogDisplay!: boolean;
  @Output() dialogDisplayChange: EventEmitter<boolean> = new EventEmitter();
  @Input() selectedTransaction!: Transaction;

  selectedOrder!: OrderHeader;
  isDetailSection: boolean = false;

  constructor(
    private orderService: OrderService,
    private messageService: CustomMessageService
  ) {}

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
