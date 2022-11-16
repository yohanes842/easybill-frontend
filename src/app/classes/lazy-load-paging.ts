import { OrderHeader } from './order-header';

export class LazyLoadPaging {
  nextPage: number = 1;
  maxPage: number = 0;
  pageFetchIndicator: number = 0;
  maxScroll: number = 0;
  orders: OrderHeader[] = [];
}
