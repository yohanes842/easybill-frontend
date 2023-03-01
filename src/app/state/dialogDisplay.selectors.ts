import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DialogDisplayState } from '../interfaces/dialogDisplayState';

const getDialogDisplayState =
  createFeatureSelector<DialogDisplayState>('dialogDisplay');

export const getChangeUsernameDialogDisplay = createSelector(
  getDialogDisplayState,
  (state) => state.usernameDialogDisplay
);

export const getChangePasswordDialogDisplay = createSelector(
  getDialogDisplayState,
  (state) => state.passwordDialogDisplay
);

export const getChangeAccountNumberDialogDisplay = createSelector(
  getDialogDisplayState,
  (state) => state.accountNumberDialogDisplay
);
