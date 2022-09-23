import { OrderHeader } from './order-header';

export class User {
  id?: number;
  username!: string;
  order_list?: OrderHeader[];
}
