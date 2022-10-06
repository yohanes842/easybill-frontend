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
  display: boolean = false;
  modalType!: string;

  users!: User[];
  filteredUsernames!: string[];

  newOrder: OrderHeader = new OrderHeader();
  subOrders: OrderDetail[] = [];
  newSubOrder: OrderDetail = new OrderDetail();
  currentTime!: Date;

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

  showAddModal() {
    this.modalType = 'add';
    this.newSubOrder = new OrderDetail();
    this.display = true;
  }

  showEditModal(index: number) {
    this.modalType = 'edit';
    this.newSubOrder = this.subOrders[index];
    this.display = true;
  }

  deleteSubOrder(index: number) {
    this.subOrders.splice(index, 1);
    this.messageService.showMessage(
      Severity.SUCCESS,
      'Successfully',
      'deleted sub-order'
    );
  }

  onSearch(keyword: string) {
    this.filteredUsernames = this.users
      .filter((user) => user.username.includes(keyword))
      .map((user) => user.username);
  }

  submitSubOrder() {
    this.newSubOrder.user_id =
      this.users.find((u: User) => u.username === this.newSubOrder.username)
        ?.id ?? 0;
    //validate if user not exist in the list
    if (this.newSubOrder.user_id === 0) {
      this.messageService.showMessage(
        Severity.ERROR,
        'Input Error',
        'User not found!'
      );
      return;
    }

    if (this.modalType === 'add') this.subOrders.push(this.newSubOrder);
    this.newSubOrder = new OrderDetail();

    this.display = false;

    this.messageService.showMessage(
      Severity.SUCCESS,
      'Successfully',
      this.modalType === 'add' ? 'added new sub-order' : 'edit sub-order'
    );
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

    if (this.subOrders.length < 1) {
      this.messageService.showMessage(
        Severity.ERROR,
        'Input Error',
        'Sub-order can not be empty'
      );
    } else {
      //prepare object to be passed
      this.newOrder.order_list = this.subOrders;
      this.newOrder.discount /= 100;
      this.newOrder.order_at = this.datePipe.transform(
        this.currentTime,
        'yyyy-MM-dd hh:mm:ss'
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

  onSubmitSubOrder(event: Event): void {
    this.submitSubOrder();
  }

  onHideDetail(): void {
    this.display = false;
  }

  backToHome(): void {
    this.router.navigateByUrl(Route.HOME_PATH);
  }

  showDeleteConfirmation(index: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this sub-order?',
      accept: () => {
        this.deleteSubOrder(index);
      },
    });
  }

  showSaveOrderConfirmation(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to save this order?',
      accept: () => {
        this.submitOrder();
      },
    });
  }
}
