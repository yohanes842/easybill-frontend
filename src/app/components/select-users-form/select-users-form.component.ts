import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
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
  addUserDialogDisplay: Boolean = false;
  participantListDialogDisplay: Boolean = false;

  users!: User[];
  filteredUsernames!: string[];
  participants: User[] = [];
  username!: string;
  selectedParticipant!: User | null;
  selectedSubOrder!: OrderDetail;

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
    let retrievedCurrentOrder: OrderHeader | null;

    //Set currentOrder retrieving process
    if (stringOfCurrentOrder) {
      retrievedCurrentOrder = JSON.parse(stringOfCurrentOrder);
    } else retrievedCurrentOrder = this.orderService.getCurrentOrder();

    if (!retrievedCurrentOrder) {
      this.router.navigateByUrl(Route.ADD_ORDER_PATH);
      return;
    } else this.currentOrder = retrievedCurrentOrder;

    if (stringOfParticipants)
      this.participants = JSON.parse(stringOfParticipants);
    else this.participants = [];

    //Set users
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
    this.addUserDialogDisplay = true;
  }

  filterUsername(keyword: string) {
    keyword = keyword.toLocaleLowerCase();
    this.filteredUsernames = this.users
      .filter((user) => user.username.includes(keyword))
      .slice(0, 5)
      .map((user) => user.username);
  }

  showUserListDialog(subOrder: OrderDetail) {
    if (subOrder.users.length > 0) {
      this.selectedSubOrder = subOrder;
      this.participantListDialogDisplay = true;
    }
  }

  hideParticipantListDialog() {
    this.participantListDialogDisplay = false;
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
      this.currentOrder.order_list.forEach((subOrder) => {
        const removalIndex = subOrder.users.indexOf(this.participants[index]);
        if (removalIndex > -1) subOrder.users.splice(removalIndex, 1);
      });

      this.participants.splice(index, 1);

      // Nullify selectedParticipant if that participant is being deleted
      let participant = this.participants.find(
        (user) => user == this.selectedParticipant
      );
      if (!participant) this.selectedParticipant = null;
    }
  }

  selectParticipant(user: User) {
    this.selectedParticipant = user;
  }

  chooseSubOrder(subOrder: OrderDetail) {
    if (this.selectedParticipant) {
      let user = subOrder.users.find(
        (user) => user == this.selectedParticipant
      );

      if (user) {
        this.removeParticipantFromSubOrderList(
          subOrder,
          this.selectedParticipant
        );
      } else {
        subOrder.users.push(this.selectedParticipant);
      }
    }
  }

  removeParticipantFromSubOrderList(
    subOrder: OrderDetail,
    selectedParticipant: User
  ) {
    let deleteIndex = subOrder.users.indexOf(selectedParticipant);
    subOrder.users.splice(deleteIndex, 1);
  }

  isSelectedUserHasOrder(subOrder: OrderDetail): boolean {
    return subOrder.users.some((user) => user == this.selectedParticipant);
  }

  saveOrder(): void {
    const isAnySubOrderWithNoUser = this.currentOrder.order_list.some(
      (subOrder) => subOrder.users.length <= 0
    );

    if (!isAnySubOrderWithNoUser) {
      //set discount to float numbering
      this.currentOrder.discount /= 100;

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

        localStorage.removeItem('currentUsersInForm');
        localStorage.removeItem('currentOrder');
        this.orderService.setCurrentOrder(null);
      });
    } else {
      this.messageService.showMessage(
        Severity.ERROR,
        'Submit Error',
        'Please make sure all suborders have participant(s)!'
      );
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

  cloneOrder(subOrder: OrderDetail): OrderDetail {
    const newSubOrder: OrderDetail = new OrderDetail();
    newSubOrder.order_menu_desc = subOrder.order_menu_desc;
    newSubOrder.price = subOrder.price;
    newSubOrder.qty = subOrder.qty;
    newSubOrder.users = [...subOrder.users];

    return newSubOrder;
  }

  cloneSubOrderToList(subOrder: OrderDetail): void {
    const index = this.currentOrder.order_list.indexOf(subOrder);
    this.currentOrder.order_list.splice(index, 0, this.cloneOrder(subOrder));
  }
}
