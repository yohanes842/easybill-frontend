import { OrderDetail } from './order-detail';
import { OrderHeader } from './order-header';
import { Transaction } from './transaction';

export class User {
  id?: number;
  username!: string;
  order_list?: OrderHeader[];
  sub_order_list?: OrderDetail[];
  access_token?: string;
  user_orders?: OrderDetail[];
  total_price?: number;
  discount_total?: number;
  total_after_discount?: number;
  bill_transaction_list?: Transaction[];
}
