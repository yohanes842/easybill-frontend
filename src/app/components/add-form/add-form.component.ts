import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderHeader } from 'src/app/classes/order-header';
import { OrderDetail } from 'src/app/classes/order-detail';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user/user.service';
import { OrderService } from 'src/app/services/order/order.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Route } from 'src/app/enums/Route';
import { CommonService } from 'src/app/services/common/common.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { Severity } from 'src/app/enums/Severity';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
  styles: ['span { width: 3rem !important; }'],
})
export class AddFormComponent implements OnInit {
  addUserDisplay: boolean = false;
  addSubOrderDisplay: boolean = false;
  modalType!: string;

  users!: User[];
  filteredUsernames!: string[];

  newOrder: OrderHeader = new OrderHeader();
  subOrders: OrderDetail[] = [];
  currentTime!: Date;
  participants: User[] = [];
  selectedUser!: User;
  selectedSubOrder!: OrderDetail;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private datePipe: DatePipe,
    private router: Router,
    private commonService: CommonService,
    private messageService: CustomMessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.commonService.changePageTitle(Route.ADD_ORDER_PATH);

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

  showAddUserDialog() {
    this.addUserDisplay = true;
  }

  showAddSubOrderDialog(user: User) {
    this.hideDialog();
    this.modalType = 'add';
    this.selectedUser = user;
    this.selectedSubOrder = new OrderDetail();
    this.addSubOrderDisplay = true;
  }

  showEditSubOrderDialog(user: User, subOrder: OrderDetail) {
    this.modalType = 'edit';
    this.selectedUser = user;
    this.selectedSubOrder = subOrder;
    this.addSubOrderDisplay = true;
  }

  deleteSubOrder(user: User, index: number) {
    user.sub_order_list!.splice(index, 1);
    this.messageService.showMessage(
      Severity.SUCCESS,
      'Successfully',
      'deleted sub-order'
    );
  }

  deleteParticipant(index: number) {
    this.participants.splice(index, 1);
    this.messageService.showMessage(
      Severity.SUCCESS,
      'Successfully',
      'deleted user participants'
    );
  }

  filterUsername(keyword: string) {
    keyword = keyword.toLocaleLowerCase();
    this.filteredUsernames = this.users
      .filter((user) => user.username.includes(keyword))
      .slice(0, 5)
      .map((user) => user.username);
  }

  submitOrder() {
    this.newOrder.buyer_id = this.users.find(
      (u: User) => u.username === this.newOrder.username
    )?.id;
    //validate if user not exist in the list
    if (this.newOrder.buyer_id === 0) {
      this.messageService.showMessage(
        Severity.ERROR,
        'Input Error',
        'User not found!'
      );
      return;
    }

    if (this.participants.length > 0) {
      let isExistUserWithNoSubOrder = this.participants.every(
        (user) => user.sub_order_list!.length === 0
      );
      if (isExistUserWithNoSubOrder) {
        this.messageService.showMessage(
          Severity.ERROR,
          'Input Error',
          'Please specify order details for every user!'
        );
        return;
      }
      this.participants.forEach(
        (user) =>
          (this.subOrders = [...this.subOrders, ...user.sub_order_list!])
      );
    }

    if (this.subOrders.length < 1) {
      this.messageService.showMessage(
        Severity.ERROR,
        'Input Error',
        'Order detail can not be empty'
      );
    } else {
      //prepare object to be passed
      this.newOrder.order_list = this.subOrders;
      this.newOrder.discount /= 100;
      this.newOrder.order_at = this.datePipe.transform(
        this.currentTime,
        'yyyy-MM-dd HH:mm:ss'
      )!;

      // Hit add order service
      this.orderService.addOrder(this.newOrder).subscribe((res: any) => {
        console.log(res);
      });

      // Redirect to home page
      this.messageService.showMessage(
        Severity.SUCCESS,
        'Successfully',
        'Added new order'
      );
      this.router.navigateByUrl(Route.HOME_PATH);
    }
  }

  hideDialog(): void {
    this.addUserDisplay = false;
    this.addSubOrderDisplay = false;
  }

  backToHome(): void {
    this.router.navigateByUrl(Route.HOME_PATH);
  }

  showDeleteSubOrderConfirmation(user: User, index: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this sub-order?',
      accept: () => {
        this.deleteSubOrder(user, index);
      },
    });
  }

  showDeleteParticipantConfirmation(username: string, index: number): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete ${username.toLocaleUpperCase()} from participant list?`,
      accept: () => {
        this.deleteParticipant(index);
      },
    });
  }

  showSaveOrderConfirmation(): void {
    console.log('amsuk');
    this.confirmationService.confirm({
      message: 'Are you sure that you want to save this order?',
      accept: () => {
        this.submitOrder();
      },
    });
  }
}
