import { OrderHeader } from 'src/app/classes/order-header';
import { OrderDetail } from 'src/app/classes/order-detail';
import { Transaction } from 'src/app/classes/transaction';
import { User } from 'src/app/classes/user';
import { Status } from 'src/app/classes/status';

export interface CurrentSelectedState {
  selectedOrder: OrderHeader;
  selectedSubOrder: OrderDetail;
  selectedTransaction: Transaction;
  selectedBill: Status;
  selectedUser: User;
}

export const initialState: CurrentSelectedState = {
  selectedOrder: new OrderHeader(),
  selectedSubOrder: new OrderDetail(),
  selectedTransaction: new Transaction(),
  selectedBill: new Status(),
  selectedUser: new User(),
};
