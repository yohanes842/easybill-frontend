import { LazyLoadStatus } from './lazy-load-status';

export class LazyLoadOrder {
  relevantOrders: LazyLoadStatus = new LazyLoadStatus();
  userOrders: LazyLoadStatus = new LazyLoadStatus();
}
