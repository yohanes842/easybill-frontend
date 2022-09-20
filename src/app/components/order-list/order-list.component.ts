import { Component, OnInit } from '@angular/core';
import { OrderHeader } from 'src/app/interfaces/order-header';
import { OrderService } from './order-list.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService],
})
export class OrderListComponent implements OnInit {
  orders!: OrderHeader[];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getProductsSmall().then((data) => (this.orders = data));
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
