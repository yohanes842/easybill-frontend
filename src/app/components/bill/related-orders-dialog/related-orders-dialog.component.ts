import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderHeader } from 'src/app/classes/order-header';
import { Status } from 'src/app/classes/status';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'related-orders-dialog',
  templateUrl: './related-orders-dialog.component.html',
  styleUrls: ['./related-orders-dialog.component.css'],
})
export class RelatedOrdersDialogComponent implements OnInit {
  @Input() selectedBill!: Status;
  @Input() isPayable!: boolean;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  display: boolean = true;
  displayDetail!: boolean;
  selectedOrder!: OrderHeader;
  isDetailSection: boolean = false;

  constructor(
    private orderService: OrderService,
    private messageService: CustomMessageService
  ) {}

  ngOnInit(): void {}

  hideDialog() {
    this.onClose.emit();
  }

  showDetail(order: OrderHeader): void {
    this.orderService.getOrder(order.id!).subscribe(
      (res: any) => {
        this.selectedOrder = res.output.data;
        this.selectedOrder.discount *= 100;
        this.isDetailSection = true;
      },
      (error: HttpErrorResponse) => {
        this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
      }
    );
    this.displayDetail = true;
  }

  backToRelatedOrders(): void {
    this.isDetailSection = false;
  }
}
