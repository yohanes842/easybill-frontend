import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/constant/Route';
import { OrderHeader } from 'src/app/interfaces/order-header';
import { User } from 'src/app/interfaces/user';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from 'src/app/services/order.service'; 

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService],
})
export class OrderListComponent implements OnInit {
  currentUser!: User;
  orders!: OrderHeader[];

  constructor(private orderService: OrderService, private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.changePageTitle(Route.HomePath);

    this.orderService.getUserOrders(1).subscribe((res: any) => {
      this.currentUser = res.output.data;
      this.orders = (this.currentUser.order_list as OrderHeader[]);
      console.log(res);
    });
  }
  
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
