import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderHeader } from 'src/app/classes/order-header';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'order-list-content',
  templateUrl: './order-list-content.component.html',
  styleUrls: ['./order-list-content.component.css']
})
export class OrderListContentComponent implements OnInit {
  @Input() order!: OrderHeader;
  @Output() onShowDetail: EventEmitter<any> = new EventEmitter();

  selectedOrder!: OrderHeader;

  constructor(private orderService: OrderService, private messageService: CustomMessageService) { }

  ngOnInit(): void {
  }

  showDetail(order: OrderHeader) {
    this.orderService.getOrder(order.id!).subscribe(
      (res: any) => {
        this.selectedOrder = res.output.data;
        this.selectedOrder.discount *= 100;
        this.onShowDetail.emit(this.selectedOrder);
      },
      (error: HttpErrorResponse) => {
        this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
      }
    );
  }

}
