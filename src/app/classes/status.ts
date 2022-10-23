import { OrderHeader } from './order-header';
import { User } from './user';

export class Status {
  id!: number;
  status!: string;
  owe_amount!: number;
  total_paid!: number;
  user!: User;
  related_order_header!: OrderHeader[];
}
