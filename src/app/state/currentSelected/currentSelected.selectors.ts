import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrentSelectedState } from './currentSelected.state';

const getCurrentSelectedState =
  createFeatureSelector<CurrentSelectedState>('currentSelected');

export const getSelectedOrder = createSelector(
  getCurrentSelectedState,
  (state) => state.selectedOrder
);

export const getSelectedSubOrder = createSelector(
  getCurrentSelectedState,
  (state) => state.selectedSubOrder
);

export const getSelectedTransaction = createSelector(
  getCurrentSelectedState,
  (state) => state.selectedTransaction
);

export const getSelectedBill = createSelector(
  getCurrentSelectedState,
  (state) => state.selectedBill
);

export const getSelectedUser = createSelector(
  getCurrentSelectedState,
  (state) => state.selectedUser
);
