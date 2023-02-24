import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderHeader } from 'src/app/classes/order-header';

@Component({
  selector: 'bill-related-order-content',
  templateUrl: './bill-related-order-content.component.html',
  styleUrls: ['./bill-related-order-content.component.css'],
})
export class BillRelatedOrderContentComponent implements OnInit {
  @Input() order!: OrderHeader;
  @Input() index!: number;
  @Output() onShowDetail: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  showDetail(order: OrderHeader): void {
    this.onShowDetail.emit(order);
  }
}
