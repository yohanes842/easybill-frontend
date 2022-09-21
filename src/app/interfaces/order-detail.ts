export class OrderDetail {
  id?: number;
  username?: string;
  user_id?: number;
  order_menu_desc!: string;
  qty: number = 1;
  price!: number;
}
