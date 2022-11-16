import { LazyLoadPaging } from './lazy-load-paging';

export class LazyLoadStatus {
  allOrders: LazyLoadPaging = new LazyLoadPaging();
  paidOrders: LazyLoadPaging = new LazyLoadPaging();
  unpaidOrders: LazyLoadPaging = new LazyLoadPaging();
}
