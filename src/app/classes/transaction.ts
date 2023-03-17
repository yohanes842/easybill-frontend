import { RelatedOrder } from './related-order';
import { User } from './user';

export class Transaction {
  payer: User;
  receiver: User;
  paid_amount: number;
  created_at: Date;
  bill_transaction_header_list: RelatedOrder[];
  origin: string;
}
