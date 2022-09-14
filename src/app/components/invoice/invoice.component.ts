import { Component, OnInit } from '@angular/core';
import { OrderList } from '../order-list/order-list';
import { OrderService } from '../order-list/order-list.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [OrderService]
})
export class InvoiceComponent implements OnInit {
  orders!: OrderList[];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getProductsSmall().then((data) => (this.orders = data));
    setTimeout(() => {

      console.log(this.orders);
    }, 5000)
  }
}
