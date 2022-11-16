import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { LazyLoadPaging } from 'src/app/classes/lazy-load-paging';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';
import { Status } from 'src/app/enums/Status';
import { LazyLoadService } from 'src/app/services/lazy-load/lazy-load.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService],
})
export class OrderListComponent implements OnInit, DoCheck, OnDestroy {
  display: boolean = false;

  currentUser!: User;
  orders!: OrderHeader[];

  isRelevantOrder: Boolean = true;
  selectedStatusOptions: string = Status.ALL;
  currentLazyPage!: LazyLoadPaging;

  selectedOrder!: OrderHeader;

  relevantOrders = {
    allOrders: new LazyLoadPaging(),
    paidOrders: new LazyLoadPaging(),
    unpaidOrders: new LazyLoadPaging(),
  };
  userOrders = {
    allOrders: new LazyLoadPaging(),
    paidOrders: new LazyLoadPaging(),
    unpaidOrders: new LazyLoadPaging(),
  };

  onScrollEvent = () => {
    if (this.lazyLoadService.isNeedLazyLoad()) {
      this.lazyLoadService.incrementPageFetchIndicator();
      this.loadData();
    }
  };

  constructor(
    private orderService: OrderService,
    private lazyLoadService: LazyLoadService
  ) {}

  ngDoCheck(): void {
    if (this.lazyLoadService.currentLazyPaging) {
      console.log('Daniel suka tahu...');
      this.lazyLoadService.calculateMaxScroll();
    }
  }

  ngOnInit(): void {
    //add event listener
    window.addEventListener('scroll', this.onScrollEvent);
    this.isRelevantOrder = true;
    this.selectedStatusOptions = Status.ALL;
    this.setCurrentLazyPage();
    this.loadData();
  }

  showDetail(selectedOrder: OrderHeader): void {
    this.selectedOrder = selectedOrder;
    this.display = true;
  }

  hideDetail(): void {
    this.display = false;
  }

  setCurrentLazyPage(): void {
    if (this.isRelevantOrder) {
      switch (this.selectedStatusOptions) {
        case Status.ALL:
          this.currentLazyPage = this.relevantOrders.allOrders;
          break;
        case Status.PAID:
          this.currentLazyPage = this.relevantOrders.paidOrders;
          break;
        case Status.UNPAID:
          this.currentLazyPage = this.relevantOrders.unpaidOrders;
          break;
      }
    } else {
      switch (this.selectedStatusOptions) {
        case Status.ALL:
          this.currentLazyPage = this.userOrders.allOrders;
          break;
        case Status.PAID:
          this.currentLazyPage = this.userOrders.paidOrders;
          break;
        case Status.UNPAID:
          this.currentLazyPage = this.userOrders.unpaidOrders;
          break;
      }
    }
  }

  changeLazyPage(): void {
    this.setCurrentLazyPage();
    if (this.currentLazyPage.orders.length <= 0) this.loadData();
    else {
      this.lazyLoadService.setCurrentLazyPaging(this.currentLazyPage);
      this.orders = this.currentLazyPage.orders;
    }
  }

  changeDataViewContent(isRelevantOrder: Boolean): void {
    this.isRelevantOrder = isRelevantOrder;
    this.changeLazyPage();
  }

  changeStatusFilter(selectedStatusOptions: string): void {
    this.selectedStatusOptions = selectedStatusOptions;
    this.changeLazyPage();
  }

  async loadData(): Promise<void> {
    return new Promise((resolve) => {
      if (this.isRelevantOrder) {
        this.orderService
          .getRelevantOrders(this.currentLazyPage.nextPage)
          .subscribe((res: any) => {
            this.orderSubscriptions(res);
            console.log(
              this.lazyLoadService.currentLazyPaging.pageFetchIndicator
            );

            resolve(undefined);
          });
      } else {
        this.orderService
          .getUsersOrders(this.currentLazyPage.nextPage)
          .subscribe((res: any) => {
            this.orderSubscriptions(res);
            console.log(
              this.lazyLoadService.currentLazyPaging.pageFetchIndicator
            );
            resolve(undefined);
          });
      }
    });
  }

  orderSubscriptions(res: any): void {
    this.currentUser = res.output.data;
    let latestFetchOrders: OrderHeader[] = this.currentUser
      .order_list as OrderHeader[];

    this.currentLazyPage.orders = this.currentLazyPage.orders.concat([
      ...latestFetchOrders,
    ]);
    this.currentLazyPage.maxPage = res.output.total_pages;
    this.currentLazyPage.pageFetchIndicator = res.output.page;
    this.currentLazyPage.nextPage = Math.min(
      res.output.total_pages,
      res.output.page + 1
    );
    this.lazyLoadService.setCurrentLazyPaging(this.currentLazyPage);

    this.orders = this.currentLazyPage.orders;
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScrollEvent);
  }
}
