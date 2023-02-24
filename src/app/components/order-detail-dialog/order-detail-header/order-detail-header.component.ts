import { Component, Input, OnInit } from '@angular/core';
import { OrderHeader } from 'src/app/classes/order-header';

@Component({
  selector: 'order-detail-header',
  templateUrl: './order-detail-header.component.html',
  styleUrls: ['./order-detail-header.component.css'],
})
export class OrderDetailHeaderComponent implements OnInit {
  @Input() selectedOrder!: OrderHeader;

  constructor() {}

  ngOnInit(): void {}
}
