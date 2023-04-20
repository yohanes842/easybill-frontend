import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LazyLoadPaging } from 'src/app/classes/lazy-load-paging';
import { OrderHeader } from 'src/app/classes/order-header';
import { UserOrders } from 'src/app/classes/userOrders';
import { Status } from 'src/app/enums/Status';
import { PagableOutputResponse } from 'src/app/interfaces/pagable-output-response';
import { Response } from 'src/app/interfaces/response';
import { LazyLoadService } from 'src/app/services/lazy-load/lazy-load.service';
import { OrderService } from 'src/app/services/order/order.service';
import { AppState } from 'src/app/state/app.state';
import { setDetailOrderDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.actions';
import { getDetailOrderDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.selectors';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [OrderService],
})
export class OrderListComponent implements OnInit, DoCheck, OnDestroy {
  currentUser: UserOrders;
  orders: OrderHeader[];
  selectedOrder: OrderHeader;

  isRelevantOrder: boolean = true;
  selectedStatusOptions: string = Status.ALL;
  searchKeyword: string = '';

  currentLazyPage: LazyLoadPaging<OrderHeader> =
    new LazyLoadPaging<OrderHeader>();
  isFetching: boolean = false;
  relevantOrders = {
    allOrders: new LazyLoadPaging<OrderHeader>(),
    paidOrders: new LazyLoadPaging<OrderHeader>(),
    unpaidOrders: new LazyLoadPaging<OrderHeader>(),
  };
  userOrders = {
    allOrders: new LazyLoadPaging<OrderHeader>(),
    paidOrders: new LazyLoadPaging<OrderHeader>(),
    unpaidOrders: new LazyLoadPaging<OrderHeader>(),
  };

  dialogDisplay: Observable<boolean>;

  onScrollEvent = () => {
    if (this.lazyLoadService.isNeedLazyLoad()) {
      this.lazyLoadService.incrementPageFetchIndicator();
      this.loadData();
    }
  };

  constructor(
    private orderService: OrderService,
    private lazyLoadService: LazyLoadService<OrderHeader>,
    private store: Store<Pick<AppState, 'currentSelected'>>
  ) {
    this.isRelevantOrder = true;
    this.selectedStatusOptions = Status.ALL;

    this.dialogDisplay = this.store.select(getDetailOrderDialogDisplay);
  }

  ngDoCheck() {
    if (this.lazyLoadService.currentLazyPaging)
      this.lazyLoadService.calculateMaxScroll();
  }

  ngOnInit() {
    //add event listener
    window.addEventListener('scroll', this.onScrollEvent);
    this.setCurrentLazyPage();
    this.loadData();

    this.store.dispatch(setDetailOrderDialogDisplay({ display: false }));
  }

  setCurrentLazyPage() {
    if (this.searchKeyword.length > 0)
      this.currentLazyPage = new LazyLoadPaging<OrderHeader>();
    else if (this.isRelevantOrder) {
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

  changeLazyPage() {
    this.setCurrentLazyPage();
    if (this.currentLazyPage.objects.length <= 0) this.loadData();
    else {
      this.lazyLoadService.setCurrentLazyPaging(this.currentLazyPage);
      this.orders = this.currentLazyPage.objects;
    }
  }

  changeDataViewContent(isRelevantOrder: boolean) {
    if (!this.isFetching) {
      this.isRelevantOrder = isRelevantOrder;
      this.changeLazyPage();
    }
  }

  changeStatusFilter(selectedStatusOptions: string) {
    if (!this.isFetching) {
      this.selectedStatusOptions = selectedStatusOptions;
      this.changeLazyPage();
    }
  }

  changeKeywordInput(keyword: string) {
    if (!this.isFetching) {
      this.searchKeyword = keyword;
      this.changeLazyPage();
    }
  }

  loadData() {
    const orderSubscriptions = (
      res: Response<PagableOutputResponse<UserOrders>>,
      currentLazyPage: LazyLoadPaging<OrderHeader>
    ) => {
      if (currentLazyPage == this.currentLazyPage) {
        this.currentUser = res.output.data;
        let latestFetchOrders: OrderHeader[] = this.currentUser
          .order_list as OrderHeader[];

        this.currentLazyPage.objects = this.currentLazyPage.objects.concat([
          ...latestFetchOrders,
        ]);
        this.currentLazyPage.maxPage = res.output.total_pages as number;
        this.currentLazyPage.pageFetchIndicator = res.output.page as number;
        this.currentLazyPage.nextPage =
          res.output.total_pages === res.output.page &&
          res.output.total_pages != 0
            ? (res.output.total_pages as number)
            : (res.output.page as number) + 1;
        this.lazyLoadService.setCurrentLazyPaging(this.currentLazyPage);

        this.orders = this.currentLazyPage.objects;
      }
    };

    const currentLazyPage = this.currentLazyPage;
    if (this.isRelevantOrder) {
      this.orderService
        .getRelevantOrders(
          this.currentLazyPage.nextPage,
          this.searchKeyword,
          this.selectedStatusOptions
        )
        .subscribe((res) => {
          orderSubscriptions(res, currentLazyPage);
        });
    } else {
      this.orderService
        .getUsersOrders(
          this.currentLazyPage.nextPage,
          this.searchKeyword,
          this.selectedStatusOptions
        )
        .subscribe((res: any) => {
          orderSubscriptions(res, currentLazyPage);
        });
    }
  }

  removeOrder(order: OrderHeader) {
    let index = this.orders.indexOf(order);
    this.orders.splice(index, 1);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScrollEvent);
  }
}
