import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { OrderDetail } from 'src/app/classes/order-detail';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';
import { Route } from 'src/app/enums/Route';
import { Severity } from 'src/app/enums/Severity';
import { SubOrderModalType } from 'src/app/enums/SubOrderModalType';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { OrderService } from 'src/app/services/order/order.service';
import { UserService } from 'src/app/services/user/user.service';
import { AppState } from 'src/app/state/app.state';
import {
  setAddSubOrderDialogDisplay,
  setDialogDisplayAction,
} from 'src/app/state/dialogDisplay/dialogDisplay.actions';
import { getAddSubOrderDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.selectors';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
  styles: ['span { width: 3rem !important; }'],
})
export class AddFormComponent implements OnInit {
  dialogDisplay: Observable<boolean>;
  modalType: string;
  isWithDiscount = true;
  isFlatDiscount = false;

  users: User[];
  filteredUsernames: string[];

  currentOrder: OrderHeader;
  currentTime: Date;
  participants: User[] = [];
  selectedUser: User;
  subOrderInAction: OrderDetail;

  dialogStyle = {
    'min-width': '20rem',
    'max-width': '22rem',
    width: '90%',
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private orderService: OrderService,
    private datePipe: DatePipe,
    private router: Router,
    private messageService: CustomMessageService,
    private confirmationService: ConfirmationService,
    private store: Store<Pick<AppState, 'currentSelected'>>
  ) {
    this.dialogDisplay = this.store.select(getAddSubOrderDialogDisplay);
  }

  ngOnInit() {
    const stringOfCurrentOrder = localStorage.getItem('currentOrder');
    let retrievedCurrentOrder: OrderHeader | null;

    // Set currentOrder Retrieving Process
    if (stringOfCurrentOrder)
      retrievedCurrentOrder = JSON.parse(stringOfCurrentOrder);
    else retrievedCurrentOrder = this.orderService.getCurrentOrder();

    if (!retrievedCurrentOrder) {
      this.currentOrder = new OrderHeader();
      this.currentOrder.order_list = [];
      this.currentTime = new Date();
      this.authService
        .getAuthUser()
        .subscribe((user) => (this.currentOrder.username = user.username));
    } else {
      this.currentOrder = retrievedCurrentOrder;

      const curDateISO = Date.parse(retrievedCurrentOrder?.order_at!);
      this.currentTime = new Date(curDateISO);

      if (this.currentOrder.discount > 0) {
        this.isWithDiscount = true;
        if (this.currentOrder.discount === 100) this.isFlatDiscount = true;
      } else this.isWithDiscount = false;

      if (this.currentOrder.upto <= 0) this.isWithDiscount = false;
    }

    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.output.data;
      },
    });
  }

  showAddSubOrderDialog() {
    this.modalType = SubOrderModalType.ADD;
    this.subOrderInAction = new OrderDetail();
    this.store.dispatch(setAddSubOrderDialogDisplay({ display: true }));
    this.store.dispatch(
      setDialogDisplayAction({ action: setAddSubOrderDialogDisplay })
    );
  }

  showEditSubOrderDialog(subOrder: OrderDetail) {
    this.modalType = SubOrderModalType.EDIT;
    this.subOrderInAction = subOrder;
    this.store.dispatch(setAddSubOrderDialogDisplay({ display: true }));
    this.store.dispatch(
      setDialogDisplayAction({ action: setAddSubOrderDialogDisplay })
    );
  }

  deleteSubOrder(index: number) {
    this.messageService.showMessage(
      Severity.SUCCESS,
      '',
      'Successfully removed "' +
        this.currentOrder.order_list[index].order_menu_desc +
        '"'
    );
    this.currentOrder.order_list.splice(index, 1);

    this.saveToLocalStorage();
  }

  filterUsername(keyword: string) {
    keyword = keyword.toLocaleLowerCase();
    this.filteredUsernames = this.users
      .filter((user) => user.username.includes(keyword))
      .slice(0, 5)
      .map((user) => user.username);
  }

  navigateToSelectUsers() {
    const buyer = this.users.find(
      (u: User) => u.username === this.currentOrder.username
    );
    //validate if user not exist in the list
    if (!buyer) {
      this.messageService.showMessage(Severity.ERROR, '', 'User not found!');
      return;
    }

    this.currentOrder.buyer_id = buyer.id;

    if (this.currentOrder.order_list.length < 1) {
      this.messageService.showMessage(
        Severity.ERROR,
        '',
        'Order detail can not be empty'
      );
    } else {
      //set discount
      if (
        !this.isWithDiscount ||
        this.currentOrder.discount === 0 ||
        this.currentOrder.upto === 0
      ) {
        this.currentOrder.discount = 0;
        this.currentOrder.upto = 0;
      }

      this.saveToLocalStorage();

      this.router.navigateByUrl(Route.ADD_ORDER_USER_PATH);
    }
  }

  backToHome() {
    this.router.navigateByUrl(Route.HOME_PATH);
  }

  showDeleteSubOrderConfirmation(index: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this sub-order?',
      accept: () => {
        this.deleteSubOrder(index);
      },
    });
  }

  setDiscountPercentage() {
    this.currentOrder.discount = this.isFlatDiscount
      ? 100
      : this.currentOrder.discount;
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    //set order_at attribute
    this.currentOrder.order_at = this.datePipe.transform(
      this.currentTime,
      'yyyy-MM-dd HH:mm:ss'
    )!;

    localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder));
  }

  clearOrder() {
    localStorage.removeItem('currentOrder');
    this.currentOrder = new OrderHeader();
    this.currentOrder.order_list = [];
    this.currentTime = new Date();
  }

  getTotalPrice(): number {
    return this.currentOrder.order_list
      .map((subOrder) => subOrder.qty * subOrder.price)
      .reduce((accumulator, subOrderPrice) => accumulator + subOrderPrice, 0);
  }
}
