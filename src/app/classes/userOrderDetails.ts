import { OrderDetail } from './order-detail';
import { User } from './user';

export class UserOrderDetails extends User {
  user_orders: OrderDetail[];
  total_price: number;
  discount_total: number;
  total_after_discount: number;
}
