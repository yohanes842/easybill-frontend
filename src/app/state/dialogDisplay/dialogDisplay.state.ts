import { Action, createAction } from '@ngrx/store';
import { Props } from './dialogDisplay.actions';

export interface DialogDisplayState {
  changeUsernameDialogDisplay: boolean;
  changePasswordDialogDisplay: boolean;
  changeAccountNumberDialogDisplay: boolean;
  addSubOrderDialogDisplay: boolean;
  transactionDetailsDialogDisplay: boolean;
  billDetailsDialogDisplay: boolean;
  billPaymentDialogDisplay: boolean;
  detailOrderDialogDisplay: boolean;

  dialogDisplayAction: (actionProps: Props) => Action;
}

export const initialState: DialogDisplayState = {
  changeUsernameDialogDisplay: false,
  changePasswordDialogDisplay: false,
  changeAccountNumberDialogDisplay: false,
  addSubOrderDialogDisplay: false,
  transactionDetailsDialogDisplay: false,
  billDetailsDialogDisplay: false,
  billPaymentDialogDisplay: false,
  detailOrderDialogDisplay: false,

  dialogDisplayAction: createAction('Default Action'),
};
