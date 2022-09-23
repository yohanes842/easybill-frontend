import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderHeader } from 'src/app/interfaces/order-header';

@Component({
  selector: 'dialog-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() selectedOrder!: OrderHeader;
  @Output() close: EventEmitter<any> = new EventEmitter();

  display: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  onHideDetail(): void {
    this.close.emit(null);
  }
}
