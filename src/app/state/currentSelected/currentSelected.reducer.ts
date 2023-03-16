import { Action, createReducer, on } from '@ngrx/store';
import {
  setSelectedBill,
  setSelectedOrder,
  setSelectedSubOrder,
  setSelectedTransaction,
  setSelectedUser,
} from './currentSelected.actions';
import { CurrentSelectedState, initialState } from './currentSelected.state';

const _currentSelectedReducer = createReducer(
  initialState,
  on(setSelectedOrder, (state, action) => {
    return {
      ...state,
      selectedOrder: action.order,
    };
  }),
  on(setSelectedSubOrder, (state, action) => {
    return {
      ...state,
      selectedSubOrder: action.subOrder,
    };
  }),
  on(setSelectedTransaction, (state, action) => {
    return {
      ...state,
      selectedTransaction: action.transaction,
    };
  }),
  on(setSelectedBill, (state, action) => {
    return {
      ...state,
      selectedBill: action.bill,
    };
  }),
  on(setSelectedUser, (state, action) => {
    return {
      ...state,
      selectedUser: action.user,
    };
  })
);

export function currentSelectedReducer(
  state: CurrentSelectedState | undefined,
  action: Action
) {
  return _currentSelectedReducer(state, action);
}
