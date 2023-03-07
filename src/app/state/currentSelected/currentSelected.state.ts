import { OrderHeader } from 'src/app/classes/order-header';
import { OrderDetail } from 'src/app/classes/order-detail';
import { Transaction } from 'src/app/classes/transaction';
import { User } from 'src/app/classes/user';

export interface CurrentSelectedState {
  selectedOrder: OrderHeader;
  selectedSubOrder: OrderDetail;
  selectedTransaction: Transaction;
  selectedUser: User;
}

export const initialState: CurrentSelectedState = {
  selectedOrder: new OrderHeader(),
  selectedSubOrder: new OrderDetail(),
  selectedTransaction: new Transaction(),
  selectedUser: new User(),
};
