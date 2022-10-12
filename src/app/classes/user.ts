import { OrderDetail } from './order-detail';
import { OrderHeader } from './order-header';

export class User {
  id?: number;
  username!: string;
  order_list?: OrderHeader[];
  sub_order_list?: OrderDetail[];
  access_token?: string;
}
