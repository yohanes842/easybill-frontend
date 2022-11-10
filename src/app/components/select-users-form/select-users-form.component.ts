import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { throttleTime } from 'rxjs';
import { OrderDetail } from 'src/app/classes/order-detail';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';
import { Route } from 'src/app/enums/Route';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'select-user-form',
  templateUrl: './select-users-form.component.html',
  styleUrls: ['./select-users-form.component.css'],
})
export class SelectusersFormComponent implements OnInit {
  dialogDisplay: Boolean = false;

  users!: User[];
  filteredUsernames!: string[];
  participants: User[] = [];
  username!: string;
  selectedParticipant!: User | null;

  currentOrder!: OrderHeader;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private userService: UserService,
    private messageService: CustomMessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    const stringOfCurrentOrder = localStorage.getItem('currentOrder');
    const stringOfParticipants = localStorage.getItem('currentUsersInForm');

    if (stringOfCurrentOrder)
      this.currentOrder = JSON.parse(stringOfCurrentOrder);
    else this.currentOrder = this.orderService.getCurrentOrder();

    if (!this.currentOrder) {
      this.router.navigateByUrl(Route.ADD_ORDER_PATH);
      return;
    }

    if (stringOfParticipants)
      this.participants = JSON.parse(stringOfParticipants);
    else this.participants = [];

    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response.output.data;
      },
      (error: HttpErrorResponse) => {
        this.messageService.showMessage(Severity.ERROR, 'Request Error');
      }
    );
  }

  back(): void {
    this.router.navigateByUrl(Route.ADD_ORDER_PATH);
  }

  showAddUserDialog() {
    this.dialogDisplay = true;
  }

  filterUsername(keyword: string) {
    keyword = keyword.toLocaleLowerCase();
    this.filteredUsernames = this.users
      .filter((user) => user.username.includes(keyword))
      .slice(0, 5)
      .map((user) => user.username);
  }

  addParticipant() {
    let participant = this.participants.find(
      (user) => user.username == this.username
    );
    if (participant) {
      this.messageService.showMessage(
        Severity.ERROR,
        'Input Error',
        'User already exist!'
      );
      return;
    }

    let user = this.users.find((user) => user.username == this.username);

    if (user) {
      this.participants.push(user);
      this.username = '';

      localStorage.setItem(
        'currentUsersInForm',
        JSON.stringify(this.participants)
      );
    } else {
      this.messageService.showMessage(
        Severity.ERROR,
        'Input Error',
        'User does not exist!'
      );
    }
  }

  removeParticipant(index: number) {
    if (index < this.participants.length) {
      this.participants.splice(index, 1);

      let participant = this.participants.find(
        (user) => user == this.selectedParticipant
      );
      if (!participant) this.selectedParticipant = null;
    }
  }

  selectParticipant(index: number) {
    if (index < this.participants.length) {
      this.selectedParticipant = this.participants[index];
    }
  }

  chooseSubOrder(index: number) {
    if (
      index < this.currentOrder.order_list.length &&
      this.selectedParticipant
    ) {
      let user = this.currentOrder.order_list[index].users.find(
        (user) => user == this.selectedParticipant
      );

      if (user) {
        let deleteIndex = this.currentOrder.order_list[index].users.indexOf(
          this.selectedParticipant
        );
        this.currentOrder.order_list[index].users.splice(deleteIndex, 1);
      } else {
        this.currentOrder.order_list[index].users.push(
          this.selectedParticipant
        );
      }
      console.log(this.currentOrder);
    }
  }

  isSelectedUserHasOrder(subOrder: OrderDetail): boolean {
    return subOrder.users.some((user) => user == this.selectedParticipant);
  }

  saveOrder() {
    const isAnySubOrderWithNoUser = this.currentOrder.order_list.some(
      (subOrder) => subOrder.users.length <= 0
    );

    if (!isAnySubOrderWithNoUser) {
      // Hit add order service
      this.orderService.addOrder(this.currentOrder).subscribe((res: any) => {
        console.log(res);

        // Redirect to home page
        this.messageService.showMessage(
          Severity.SUCCESS,
          'Successfully',
          'Added new order'
        );
        this.router.navigateByUrl(Route.HOME_PATH);
      });
    }
  }

  showSaveOrderConfirmation(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to save this order?',
      accept: () => {
        this.saveOrder();
      },
    });
  }
}
