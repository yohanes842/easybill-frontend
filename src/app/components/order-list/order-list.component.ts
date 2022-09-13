import { Component, OnInit } from '@angular/core';
import { OrderList } from './order-list';
import { OrderService } from './order-list.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService],
})
export class OrderListComponent implements OnInit {
  orders!: OrderList[];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getProductsSmall().then((data) => (this.orders = data));
  }
}
