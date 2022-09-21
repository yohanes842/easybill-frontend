import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/constant/Route';
import { OrderHeader } from 'src/app/interfaces/order-header';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from './order-list.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService],
})
export class OrderListComponent implements OnInit {
  orders!: OrderHeader[];

  constructor(private orderService: OrderService, private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.changePageTitle(Route.HomePath);

    this.orderService.getProductsSmall().then((data) => (this.orders = data));
  }
  
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
