import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { OrderDetail } from 'src/app/classes/order-detail';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';
import { Route } from 'src/app/enums/Route';
import { Severity } from 'src/app/enums/Severity';
import { Response } from 'src/app/interfaces/response';
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

  users!: User[];
  selectedUserDropdown!: User | undefined;
  dropdownFilter!: String;

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
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const stringOfCurrentOrder = localStorage.getItem('currentOrder');
    const stringOfCurrentParticipantsInForm = localStorage.getItem(
      'currentParticipantsInForm'
    );
    let retrievedCurrentOrder: OrderHeader | null;

    //Set currentOrder retrieving process
    if (stringOfCurrentOrder) {
      retrievedCurrentOrder = JSON.parse(stringOfCurrentOrder);
    } else retrievedCurrentOrder = this.orderService.getCurrentOrder();

    if (!retrievedCurrentOrder) {
      this.router.navigateByUrl(Route.ADD_ORDER_PATH);
      return;
    } else this.currentOrder = retrievedCurrentOrder;

    this.participants = stringOfCurrentParticipantsInForm
      ? JSON.parse(stringOfCurrentParticipantsInForm)
      : [];

    //Set users
    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response.output.data;
        this.users = this.users.filter(
          (user) =>
            !this.participants
              .map((participant) => participant.id)
              .includes(user.id)
        );
      },
      (error: HttpErrorResponse) => {
        this.messageService.showMessage(Severity.ERROR, 'Request Error');
      }
    );
  }

  addEventListernerToOptions(): void {
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

  updateFilter(event: any): void {
    this.selectedUserDropdown = undefined;
  }

  back(): void {
    this.router.navigateByUrl(Route.ADD_ORDER_PATH);
  }

  showAddUserDialog(): void {
    this.addUserDialogDisplay = true;
  }

  showUserListDialog(event: Event, subOrder: OrderDetail): void {
    event.stopPropagation();
    if (subOrder.users.length > 0) {
      this.selectedSubOrder = subOrder;
      this.participantListDialogDisplay = true;
    }
  }

  hideParticipantListDialog(): void {
    this.participantListDialogDisplay = false;
  }

  addParticipant(): void {
    const participant = this.participants.find(
      (user) => user.id === this.selectedUserDropdown!.id
    );
    if (participant) {
      this.messageService.showMessage(
        Severity.ERROR,
        'Input Error',
        'User already exist!'
      );
      return;
    }

    let user = this.users.find(
      (user) => user.id == this.selectedUserDropdown!.id
    );

    if (user) {
      this.participants.push(user);

      let index = this.users.indexOf(user, 0);
      this.users.splice(index, 1);
      console.log(this.selectedUserDropdown);
      console.log(index);
      console.log(this.users);

      this.selectedUserDropdown = undefined;

      localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder));
      localStorage.setItem(
        'currentParticipantsInForm',
        JSON.stringify(this.participants)
      );
    }
  }

  removeParticipant(index: number): void {
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

  selectParticipant(user: User): void {
    this.selectedParticipant = user;
  }

  chooseSubOrder(subOrder: OrderDetail): void {
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
  ): void {
    let deleteIndex = subOrder.users.findIndex(
      (user) => user.id === selectedParticipant.id
    );
    subOrder.users.splice(deleteIndex, 1);

    localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder));
  }

  isSelectedUserHasOrder(subOrder: OrderDetail): boolean {
    return subOrder.users.some(
      (user) => user.id === this.selectedParticipant?.id
    );
  }

  saveOrder(): void {
    const isAnySubOrderWithNoUser = this.currentOrder.order_list.some(
      (subOrder) => subOrder.users.length <= 0
    );

    if (!isAnySubOrderWithNoUser) {
      // Hit add order service
      this.orderService
        .addOrder(this.currentOrder)
        .subscribe((res: Response<OrderHeader>) => {
          // Redirect to home page
          this.messageService.showMessage(
            Severity.SUCCESS,
            'Successfully',
            'Added new order'
          );

          if (
            res.output.data.buyer.username ==
            this.authService.getCurrentUser()?.username
          )
            this.router.navigateByUrl(Route.PENDING_ORDERS_PATH);
          else this.router.navigateByUrl(Route.HOME_PATH);

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

  duplicateOrder(subOrder: OrderDetail): OrderDetail {
    const newSubOrder: OrderDetail = new OrderDetail();
    newSubOrder.order_menu_desc = subOrder.order_menu_desc;
    newSubOrder.price = subOrder.price;
    newSubOrder.qty = subOrder.qty;
    newSubOrder.users = [...subOrder.users];

    return newSubOrder;
  }

  duplicateSubOrderToList(event: Event, subOrder: OrderDetail): void {
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

  deleteSubOrder(event: Event, index: number): void {
    event.stopPropagation();
    if (index < this.currentOrder.order_list.length) {
      this.currentOrder.order_list.splice(index, 1);
    }

    localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder));
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
