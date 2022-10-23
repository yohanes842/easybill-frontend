import { OrderDetail } from './order-detail';
import { Status } from './status';
import { User } from './user';

export class OrderHeader {
  id?: number;
  username?: string;
  buyer_id?: number;
  order_at?: string;
  order_description!: string;
  total_payment!: number;
  buyer!: User;
  upto!: number;
  discount!: number;
  total_order_amount!: number;
  other_fee!: number;
  discount_amount!: number;
  order_list!: OrderDetail[];
  order_detail_group_by_user!: User[];
  bills!: Status[];
  participating_user_count!: number;
  order_header_status!: string;
  user_other_fee!: number;
  total_bill!: number;
}
