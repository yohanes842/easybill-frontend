import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'related-order-content',
  templateUrl: './related-order-content.component.html',
  styleUrls: ['./related-order-content.component.css'],
})
export class RelatedOrderContentComponent implements OnInit {
  @Input() order!: OrderHeader;
  @Input() index!: number;
  @Output() onShowDetail: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log(this.order);
  }

  showDetail(order: OrderHeader): void {
    this.onShowDetail.emit(order);
  }
}
