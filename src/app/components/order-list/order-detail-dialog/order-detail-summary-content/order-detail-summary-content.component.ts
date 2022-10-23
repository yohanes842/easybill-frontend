import { Component, Input, OnInit } from '@angular/core';
import { OrderHeader } from 'src/app/classes/order-header';

@Component({
  selector: 'order-detail-summary-content',
  templateUrl: './order-detail-summary-content.component.html',
  styleUrls: ['./order-detail-summary-content.component.css'],
})
export class OrderDetailSummaryContentComponent implements OnInit {
  @Input() selectedOrder!: OrderHeader;

  constructor() {}

  ngOnInit(): void {}
}
