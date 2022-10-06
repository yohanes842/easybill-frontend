import { OrderDetail } from './order-detail';
import { User } from './user';

export class OrderHeader {
  id?: number;
  username?: string;
  buyer_id?: number;
  order_at?: string;
  order_description!: string;
  total_payment!: number;
  user!: User;
  upto!: number;
  discount!: number;
  total_order_amount!: number;
  other_fee!: number;
  discount_amount!: number;
  order_list!: OrderDetail[];
}
