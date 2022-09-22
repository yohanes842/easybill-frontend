import { User } from "./user";

export class OrderDetail {
  id?: number;
  username?: string;
  user_id?: number;
  user!: User;
  order_menu_desc!: string;
  qty: number = 1;
  price!: number;
}
