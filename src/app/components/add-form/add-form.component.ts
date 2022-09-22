import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OrderHeader } from 'src/app/interfaces/order-header';
import { OrderDetail } from 'src/app/interfaces/order-detail';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Route } from 'src/app/constant/Route';
import { CommonService } from 'src/app/services/common.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
  styles: ['span { width: 3rem !important; }'],
})
export class AddFormComponent implements OnInit {
  @Output() updateUrl: EventEmitter<Route> = new EventEmitter();
  display: boolean = false;

  users!: User[];
  filteredUsers!: string[];

  newOrder: OrderHeader = new OrderHeader();
  subOrders: OrderDetail[] = [];
  newSubOrder: OrderDetail = new OrderDetail();
  SubOrderIsEmpty: boolean = false;
  currentTime!: Date;

  constructor(private userService: UserService, private orderService: OrderService, private datePipe: DatePipe, private router: Router, private commonService: CommonService, private messageService: MessageService) {}
  
  ngOnInit(): void {
    this.commonService.changePageTitle(Route.AddOrderPath);
    
    this.currentTime = new Date();

    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response.output.data;
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({severity:'warn', summary:'Warning', detail:'There is an error occurred!'});
      }
    );
  }

  showAddModal() {
    this.display = true;
  }

  search(event: any) {
    this.filteredUsers = this.users
      .filter((user) => user.username.includes(event.query))
      .map((user) => user.username);
  }

  submitSubOrder() {
    this.newSubOrder.user_id = this.users.find((u: User) => u.username === this.newSubOrder.username)?.id ?? 0;
    //validate if user not exist in the list
    if(this.newSubOrder.user_id === 0){
      this.messageService.add({severity:'error', summary:'Error', detail:'User not found!'});
      return;
    }

    this.subOrders.push(this.newSubOrder);

    this.display = false;
    this.SubOrderIsEmpty = false;

    this.messageService.add({severity:'success', summary:'Success', detail:'Successfully added sub-order!'});
  }

  submitOrder(){
    this.newOrder.buyer_id = this.users.find((u: User) => u.username === this.newOrder.username)?.id;
    //validate if user not exist in the list
    if(this.newOrder.buyer_id === 0){
      this.messageService.add({severity:'error', summary:'Error', detail:'User not found!'});
      return;
    }

    if(this.subOrders.length < 1) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Sub-order can not be empty!'});
    }else{
      //prepare object to be passed
      this.newOrder.order_list = this.subOrders;
      this.newOrder.discount /= 100;
      this.newOrder.order_at =  this.datePipe.transform(this.currentTime, 'yyyy-MM-dd hh:mm:ss')!;

      // Hit add order service
      this.orderService.addOrder(this.newOrder).subscribe((res: any) => {
        console.log(res);
      });

      // Redirect to home page
      this.messageService.add({severity:'success', summary:'Success', detail:'Successfully added order!'});
      this.router.navigateByUrl(Route.HomePath);
    }
  }

  backToHome(){
    this.router.navigateByUrl(Route.HomePath);
  }
}
