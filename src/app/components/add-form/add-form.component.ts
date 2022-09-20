import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderHeader } from 'src/app/interfaces/order-header';
import { OrderDetail } from 'src/app/interfaces/order-detail';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
  styles: ['span { width: 3rem !important; }'],
})
export class AddFormComponent implements OnInit {
  display: boolean = false;

  users!: User[];
  filteredUsers!: string[];

  newOrder: OrderHeader = new OrderHeader();
  subOrders: OrderDetail[] = [];
  newSubOrder: OrderDetail = new OrderDetail();
  SubOrderIsEmpty: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.newOrder.orderAt = new Date();

    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response.output.data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
    console.log(this.newSubOrder)
    this.subOrders.push(this.newSubOrder);
    this.display = false;
  }

  submitOrder(){
    if(this.subOrders.length < 1) {
      this.SubOrderIsEmpty = true;
      console.log("Isi dulu detailnya apa aja");
    }else{
      this.newOrder.orderDetailList = this.subOrders;
      console.log(this.newOrder);
    }
  }
}
