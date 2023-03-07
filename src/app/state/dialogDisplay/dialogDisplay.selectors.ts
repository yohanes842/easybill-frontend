import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DialogDisplayState } from './dialogDisplay.state';

const getDialogDisplayState =
  createFeatureSelector<DialogDisplayState>('dialogDisplay');

export const getChangeUsernameDialogDisplay = createSelector(
  getDialogDisplayState,
  (state) => state.changeUsernameDialogDisplay
);

export const getChangePasswordDialogDisplay = createSelector(
  getDialogDisplayState,
  (state) => state.changePasswordDialogDisplay
);

export const getChangeAccountNumberDialogDisplay = createSelector(
  getDialogDisplayState,
  (state) => state.changeAccountNumberDialogDisplay
);

export const getAddSubOrderDialogDisplay = createSelector(
  getDialogDisplayState,
  (state) => state.addSubOrderDialogDisplay
);

export const getTransactionDetailsDialogDisplay = createSelector(
  getDialogDisplayState,
  (state) => state.transactionDetailsDialogDisplay
);

export const getDetailOrderDialogDisplay = createSelector(
  getDialogDisplayState,
  (state) => state.detailOrderDialogDisplay
);

export const getDialogDisplayAction = createSelector(
  getDialogDisplayState,
  (state) => state.dialogDisplayAction
);