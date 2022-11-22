import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderHeader } from 'src/app/classes/order-header';
import { relatedOrder } from 'src/app/classes/related-order';

@Component({
  selector: 'transaction-related-order-content',
  templateUrl: './transaction-related-order-content.component.html',
  styleUrls: ['./transaction-related-order-content.component.css'],
})
export class TransactionRelatedOrderContentComponent implements OnInit {
  @Input() relatedOrder!: relatedOrder;
  @Input() index!: number;
  @Output() onShowDetail: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  showDetail(order: OrderHeader): void {
    this.onShowDetail.emit(order);
  }
}
