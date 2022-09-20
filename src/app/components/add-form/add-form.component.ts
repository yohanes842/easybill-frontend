import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SubOrder } from 'src/app/interfaces/sub-order';
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

  orderBy!: string;
  orderAt: Date = new Date();
  orderDescription!: string;
  discount!: string;
  uptoAmount!: string;
  totalPayment!: string;

  subOrders: SubOrder[] = [];
  newSubOrder!: SubOrder;
  subOrderBy!: string;
  subOrderDescription!: string;
  subOrderPrice!: number;
  qty: number = 1;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
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
    this.orderAt = new Date();
    this.display = true;
  }

  search(event: any) {
    this.filteredUsers = this.users
      .filter((user) => user.username.includes(event.query))
      .map((user) => user.username);
  }

  addSubOrder() {
    const order: SubOrder = {
      username: this.subOrderBy,
      orderMenuDesc: this.subOrderDescription,
      price: this.subOrderPrice,
      qty: this.qty,
    };
    this.subOrders.push(order);
    this.display = false;
  }
}
