import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { OrderDetail } from 'src/app/classes/order-detail';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';
import { Route } from 'src/app/enums/Route';
import { Severity } from 'src/app/enums/Severity';
import { AuthService } from 'src/app/services/auth/auth.service';
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

  currentOrder: OrderHeader;
  currentUser: User;

  users: User[];
  dropdownFilter: String;
  participants: User[] = [];

  selectedUserDropdown: User | null;
  selectedParticipant: User | null;
  selectedSubOrder: OrderDetail;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private userService: UserService,
    private messageService: CustomMessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Get current Order from localStorage
    const tempCurrentOrder = this.orderService.getCurrentOrder();

    if (!tempCurrentOrder) {
      this.router.navigateByUrl(Route.ADD_ORDER_PATH);
      return;
    }
    this.currentOrder = tempCurrentOrder;

    // Get participant from localStorage
    const stringOfCurrentParticipantsInForm = localStorage.getItem(
      'currentParticipantsInForm'
    );

    this.participants = stringOfCurrentParticipantsInForm
      ? JSON.parse(stringOfCurrentParticipantsInForm)
      : [];

    //Set users
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.output.data;
        this.users = this.users.filter(
          (user) =>
            !this.participants
              .map((participant) => participant.id)
              .includes(user.id)
        );
      },
    });
  }

  addEventListernerToOptions() {
    document
      .querySelectorAll('.p-dropdown-item')
      .forEach((el) =>
        el.addEventListener('click', () => this.addParticipant())
      );

    document
      .querySelector('.p-dropdown-filter')!
      .addEventListener('keydown', (event) => {
        if (
          (event as KeyboardEvent).key == 'Enter' &&
          this.selectedUserDropdown
        ) {
          this.addParticipant();
        }
      });
  }

  updateFilter() {
    this.selectedUserDropdown = null;
  }

  back() {
    this.router.navigateByUrl(Route.ADD_ORDER_PATH);
  }

  showAddUserDialog() {
    this.addUserDialogDisplay = true;
  }

  showUserListDialog(event: Event, subOrder: OrderDetail) {
    event.stopPropagation();
    if (subOrder.users.length > 0) {
      this.selectedSubOrder = subOrder;
      this.participantListDialogDisplay = true;
    }
  }

  hideParticipantListDialog() {
    this.participantListDialogDisplay = false;
  }

  addParticipant() {
    const participant = this.participants.find(
      (user) => user.id === this.selectedUserDropdown!.id
    );
    if (participant) {
      this.messageService.showMessage(Severity.ERROR, '', 'User already exist');
      return;
    }

    let user = this.users.find(
      (user) => user.id == this.selectedUserDropdown!.id
    );

    if (user) {
      this.participants.push(user);

      let index = this.users.indexOf(user, 0);
      this.users.splice(index, 1);

      this.selectedUserDropdown = null;

      localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder));
      localStorage.setItem(
        'currentParticipantsInForm',
        JSON.stringify(this.participants)
      );
    }
  }

  removeParticipant(index: number) {
    if (index < this.participants.length) {
      this.currentOrder.order_list.forEach((subOrder) => {
        const removalIndex = subOrder.users.findIndex(
          (user) => user.id === this.participants[index].id
        );
        if (removalIndex > -1) subOrder.users.splice(removalIndex, 1);
      });

      this.users.splice(0, 0, this.participants[index]);
      this.users.sort((a, b) => a.username.localeCompare(b.username));
      this.participants.splice(index, 1);

      // Nullify selectedParticipant if that participant is being deleted
      let participant = this.participants.find(
        (user) => user.id === this.selectedParticipant?.id
      );
      if (!participant) this.selectedParticipant = null;

      localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder));
      localStorage.setItem(
        'currentParticipantsInForm',
        JSON.stringify(this.participants)
      );
    }
  }

  selectParticipant(user: User) {
    this.selectedParticipant = user;
  }

  chooseSubOrder(subOrder: OrderDetail) {
    if (this.selectedParticipant) {
      let user = subOrder.users.find(
        (user) => user.id === this.selectedParticipant?.id
      );

      if (user) {
        this.removeParticipantFromSubOrderList(
          subOrder,
          this.selectedParticipant
        );
      } else {
        subOrder.users.push(this.selectedParticipant);
      }

      localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder));
    }
  }

  removeParticipantFromSubOrderList(
    subOrder: OrderDetail,
    selectedParticipant: User
  ) {
    let deleteIndex = subOrder.users.findIndex(
      (user) => user.id === selectedParticipant.id
    );
    subOrder.users.splice(deleteIndex, 1);

    localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder));
  }

  isSelectedUserHasOrder(subOrder: OrderDetail) {
    return subOrder.users.some(
      (user) => user.id === this.selectedParticipant?.id
    );
  }

  saveOrder() {
    const isAnySubOrderWithNoUser = this.currentOrder.order_list.some(
      (subOrder) => subOrder.users.length <= 0
    );

    if (!isAnySubOrderWithNoUser) {
      // Hit add order service
      this.orderService.addOrder(this.currentOrder).subscribe((res) => {
        // Redirect to home page
        this.messageService.showMessage(
          Severity.SUCCESS,
          '',
          'Successfully added new order "' +
            this.currentOrder.order_description +
            '"'
        );

        let authUsername = '';
        this.authService
          .getAuthUser()
          .subscribe((user) => (authUsername = user.username));

        if (res.output.data.buyer.username == authUsername)
          this.router.navigateByUrl(Route.PENDING_ORDERS_PATH);
        else this.router.navigateByUrl(Route.HOME_PATH);

        localStorage.removeItem('currentOrder');
      });
    } else {
      this.messageService.showMessage(
        Severity.ERROR,
        '',
        'Please make sure every sub-order have participant(s) attached'
      );
    }
  }

  showSaveOrderConfirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to save this order?',
      accept: () => {
        this.saveOrder();
      },
    });
  }

  duplicateOrder(subOrder: OrderDetail) {
    const newSubOrder = new OrderDetail();
    newSubOrder.order_menu_desc = subOrder.order_menu_desc;
    newSubOrder.price = subOrder.price;
    newSubOrder.qty = subOrder.qty;
    newSubOrder.users = [...subOrder.users];

    return newSubOrder;
  }

  duplicateSubOrderToList(event: Event, subOrder: OrderDetail) {
    event.stopPropagation();
    const index = this.currentOrder.order_list.findIndex(
      (orderDetail) => orderDetail.id === subOrder.id
    );
    this.currentOrder.order_list.splice(
      index,
      0,
      this.duplicateOrder(subOrder)
    );

    localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder));
  }

  deleteSubOrder(event: Event, index: number) {
    event.stopPropagation();
    if (index < this.currentOrder.order_list.length) {
      this.currentOrder.order_list.splice(index, 1);
    }

    localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder));
  }

  getTotalPrice(): number {
    return this.currentOrder.order_list
      .map((subOrder) => subOrder.qty * subOrder.price)
      .reduce((accumulator, subOrderPrice) => accumulator + subOrderPrice, 0);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
