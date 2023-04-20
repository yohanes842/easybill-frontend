import { Action, createAction } from '@ngrx/store';
import { Props } from './dialogDisplay.actions';

export interface DialogDisplayState {
  changeUsernameDialogDisplay: boolean;
  changePasswordDialogDisplay: boolean;
  addSubOrderDialogDisplay: boolean;
  transactionDetailsDialogDisplay: boolean;
  billDetailsDialogDisplay: boolean;
  billPaymentDialogDisplay: boolean;
  detailOrderDialogDisplay: boolean;
  passwordConfirmationDialogDisplay: boolean;

  dialogDisplayAction: (actionProps: Props) => Action;
}

export const initialState: DialogDisplayState = {
  changeUsernameDialogDisplay: false,
  changePasswordDialogDisplay: false,
  addSubOrderDialogDisplay: false,
  transactionDetailsDialogDisplay: false,
  billDetailsDialogDisplay: false,
  billPaymentDialogDisplay: false,
  detailOrderDialogDisplay: false,
  passwordConfirmationDialogDisplay: false,

  dialogDisplayAction: createAction('Default Action'),
};
