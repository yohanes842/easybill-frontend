import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
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
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
  styles: ['span { width: 3rem !important; }'],
})
export class AddFormComponent implements OnInit {
  addUserDisplay: boolean = false;
  dialogDisplay: boolean = false;
  modalType!: string;

  users!: User[];
  filteredUsernames!: string[];

  currentOrder!: OrderHeader;
  currentTime!: Date;
  participants: User[] = [];
  selectedUser!: User;
  selectedSubOrder!: OrderDetail;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private orderService: OrderService,
    private datePipe: DatePipe,
    private router: Router,
    private messageService: CustomMessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnDestroy(): void {
    console.log('lala');
  }

  ngOnInit(): void {
    const stringOfCurrentOrder = localStorage.getItem('currentOrder');
    let retrievedCurrentOrder: OrderHeader | null;

    //Set currentOrder Retrieving Process
    if (stringOfCurrentOrder) {
      retrievedCurrentOrder = JSON.parse(stringOfCurrentOrder);
    } else retrievedCurrentOrder = this.orderService.getCurrentOrder();

    if (!retrievedCurrentOrder) {
      this.currentOrder = new OrderHeader();
      this.currentOrder.order_list = [];

      const currentUser = this.authService.getCurrentUser();
      this.currentOrder.username = currentUser?.username;
    } else this.currentOrder = retrievedCurrentOrder;

    this.currentTime = new Date();

    this.userService.getUsers().subscribe(
      (response: any) => {
        this.users = response.output.data;
      },
      (error: HttpErrorResponse) => {
        this.messageService.showMessage(Severity.ERROR, 'Request Error');
      }
    );
  }

  showAddSubOrderDialog() {
    this.hideDialog();
    this.modalType = 'add';
    this.selectedSubOrder = new OrderDetail();
    this.dialogDisplay = true;
  }

  showEditSubOrderDialog(subOrder: OrderDetail) {
    this.modalType = 'edit';
    this.selectedSubOrder = subOrder;
    this.dialogDisplay = true;
  }

  deleteSubOrder(index: number) {
    this.currentOrder.order_list.splice(index, 1);
    this.messageService.showMessage(
      Severity.SUCCESS,
      'Successfully',
      'deleted sub-order'
    );
  }

  filterUsername(keyword: string) {
    keyword = keyword.toLocaleLowerCase();
    this.filteredUsernames = this.users
      .filter((user) => user.username.includes(keyword))
      .slice(0, 5)
      .map((user) => user.username);
  }

  navigateToSelectUsers() {
    this.currentOrder.buyer_id = this.users.find(
      (u: User) => u.username === this.currentOrder.username
    )?.id;
    //validate if user not exist in the list
    if (this.currentOrder.buyer_id === 0) {
      this.messageService.showMessage(
        Severity.ERROR,
        'Input Error',
        'User not found!'
      );
      return;
    }

    if (this.currentOrder.order_list.length < 1) {
      this.messageService.showMessage(
        Severity.ERROR,
        'Input Error',
        'Order detail can not be empty'
      );
    } else {
      //set order_at attribute
      this.currentOrder.order_at = this.datePipe.transform(
        this.currentTime,
        'yyyy-MM-dd HH:mm:ss'
      )!;

      this.orderService.setCurrentOrder(this.currentOrder);
      localStorage.setItem('currentOrder', JSON.stringify(this.currentOrder));

      this.router.navigateByUrl(Route.ADD_ORDER_USER_PATH);
    }
  }

  hideDialog(): void {
    this.dialogDisplay = false;
  }

  backToHome(): void {
    this.router.navigateByUrl(Route.HOME_PATH);
  }

  showDeleteSubOrderConfirmation(index: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this sub-order?',
      accept: () => {
        this.deleteSubOrder(index);
      },
    });
  }
}
