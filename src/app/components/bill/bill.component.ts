import { Component, OnInit } from '@angular/core';
import { OrderHeader } from '../order-list/order-list';
import { OrderService } from '../order-list/order-list.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
  providers: [OrderService],
})
export class BillComponent implements OnInit {
  orders!: OrderHeader[];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getProductsSmall().then((data) => (this.orders = data));
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
