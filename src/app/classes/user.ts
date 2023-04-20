import { OrderDetail } from './order-detail';
import { PaymentAccount } from './payment-account';

export class User {
  id: number;
  username: string;
  payment_account_list: PaymentAccount[] = [];
  access_token: string;
}
