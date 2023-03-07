import { createAction, props } from '@ngrx/store';
import { OrderDetail } from 'src/app/classes/order-detail';
import { OrderHeader } from 'src/app/classes/order-header';
import { Transaction } from 'src/app/classes/transaction';
import { User } from 'src/app/classes/user';

export const setSelectedOrder = createAction(
  '[Add Order Page] setSelectedOrder',
  props<{ order: OrderHeader }>()
);

export const setSelectedSubOrder = createAction(
  '[Add Order Page] setSelectedSubOrder',
  props<{ subOrder: OrderDetail }>()
);

export const setSelectedTransaction = createAction(
  '[Transaction History Page] setSelectedTransaction',
  props<{ transaction: Transaction }>()
);

export const setSelectedUser = createAction(
  '[General] setSelectedUser',
  props<{ user: User }>()
);
