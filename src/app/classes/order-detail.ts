import { User } from './user';

export class OrderDetail {
  id: number;
  username: string;
  user_id: number;
  users: User[];
  order_menu_desc: string;
  qty = 1;
  price: number;
  order_type: string;
}
