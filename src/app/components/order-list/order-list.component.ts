import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Route } from 'src/app/constant/Route';
import { OrderDetail } from 'src/app/interfaces/order-detail';
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
  display!: boolean;

  currentUser!: User;
  orders!: OrderHeader[];

  selectedOrder!: OrderHeader;
  selectedSubOrders!: OrderDetail[];

  constructor(private orderService: OrderService, private commonService: CommonService, private messageService: MessageService) {}

  ngOnInit() {
    this.commonService.changePageTitle(Route.HomePath);

    this.orderService.getUserOrders(1).subscribe((res: any) => {
      this.currentUser = res.output.data;
      this.orders = (this.currentUser.order_list as OrderHeader[]);
    },
    (error: HttpErrorResponse) => {
      this.messageService.clear();
      this.messageService.add({severity:'warn', summary:'Warning', detail:'There is an error occurred!'});
    });
  }
  
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  showDetail(order: OrderHeader){
    this.orderService.getOrder(order.id!).subscribe((res: any) => {
      this.selectedOrder = res.output.data;
      this.selectedOrder.discount *= 100;
      this.display = true;
    },
    (error: HttpErrorResponse) => {
      this.messageService.clear();
      this.messageService.add({severity:'warn', summary:'Warning', detail:'There is an error occurred!'});
    });
  }
}
