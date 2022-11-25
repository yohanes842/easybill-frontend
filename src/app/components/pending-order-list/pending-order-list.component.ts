import { Component, OnInit } from '@angular/core';
import { LazyLoadPaging } from 'src/app/classes/lazy-load-paging';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';
import { LazyLoadService } from 'src/app/services/lazy-load/lazy-load.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-pending-order-list',
  templateUrl: './pending-order-list.component.html',
  styleUrls: ['./pending-order-list.component.css'],
})
export class PendingOrderListComponent implements OnInit {
  display: boolean = false;
  isFetching: boolean = false;

  currentUser!: User;
  lazyPaging: LazyLoadPaging<OrderHeader> = new LazyLoadPaging();
  selectedOrder!: OrderHeader;

  onScrollEvent = () => {
    if (this.lazyLoadService.isNeedLazyLoad()) {
      this.lazyLoadService.incrementPageFetchIndicator();
      this.loadData();
    }
  };

  constructor(
    private orderService: OrderService,
    private lazyLoadService: LazyLoadService<OrderHeader>
  ) {}

  ngDoCheck(): void {
    if (this.lazyLoadService.currentLazyPaging)
      this.lazyLoadService.calculateMaxScroll();
  }

  ngOnInit(): void {
    //add event listener
    window.addEventListener('scroll', this.onScrollEvent);
    this.loadData();
  }

  showDetail(selectedOrder: OrderHeader): void {
    this.selectedOrder = selectedOrder;
    this.display = true;
  }

  hideDetail(): void {
    this.display = false;
  }

  loadData(): void {
    const orderSubscriptions = (res: any): void => {
      this.currentUser = res.output.data;
      let latestFetchOrders: OrderHeader[] = this.currentUser
        .order_list as OrderHeader[];

      this.lazyPaging.objects = this.lazyPaging.objects.concat([
        ...latestFetchOrders,
      ]);
      this.lazyPaging.maxPage = res.output.total_pages;
      this.lazyPaging.pageFetchIndicator = res.output.page;
      this.lazyPaging.nextPage =
        res.output.total_pages === res.output.page &&
        res.output.total_pages != 0
          ? res.output.total_pages
          : res.output.page + 1;
    };

    this.orderService
      .getUsersOrders(this.lazyPaging.nextPage)
      .subscribe((res: any) => {
        orderSubscriptions(res);
      });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScrollEvent);
  }
}
