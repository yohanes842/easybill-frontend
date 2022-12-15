import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { OrderHeader } from 'src/app/classes/order-header';
import { Severity } from 'src/app/enums/Severity';
import { ErrorResponse } from 'src/app/interfaces/error-response';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'pending-order-list-content',
  templateUrl: './pending-order-list-content.component.html',
  styleUrls: ['./pending-order-list-content.component.css'],
})
export class PendingOrderListContentComponent implements OnInit {
  @Input() order!: OrderHeader;
  @Output() onShowDetail: EventEmitter<any> = new EventEmitter();
  @Output() onDeleted: EventEmitter<OrderHeader> = new EventEmitter();
  @Output() onApproved: EventEmitter<OrderHeader> = new EventEmitter();

  selectedOrder!: OrderHeader;

  constructor(
    private orderService: OrderService,
    private messageService: CustomMessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  showDetail(order: OrderHeader) {
    this.selectedOrder = this.orderService.getViewedOrder(order.id!)!;

    if (this.selectedOrder) this.onShowDetail.emit(this.selectedOrder);
    else {
      this.orderService.getOrder(order.id!).subscribe(
        (res: any) => {
          this.selectedOrder = res.output.data;
          this.orderService.setViewedOrder(
            this.selectedOrder.id!,
            this.selectedOrder
          );

          this.onShowDetail.emit(this.selectedOrder);
        },
        (error: HttpErrorResponse) => {
          this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
        }
      );
    }
  }

  showApproveConfirmation(event: Event): void {
    event.stopPropagation();
    this.confirmationService.confirm({
      message: 'Are you sure that you want to approve this order?',
      accept: () => {
        this.orderService.approveOrder(this.order.id!).subscribe((res: any) => {
          this.messageService.showMessage(Severity.SUCCESS, 'ORDER APPROVED');
          this.onApproved.emit(this.order);
        });
      },
    });
  }

  showDeleteConfirmation(event: Event): void {
    event.stopPropagation();
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this order?',
      accept: () => {
        this.orderService.deleteOrder(this.order.id!).subscribe((res: any) => {
          this.messageService.showMessage(Severity.SUCCESS, 'ORDER DELETED');
          this.onDeleted.emit(this.order);
        });
      },
    });
  }
}
