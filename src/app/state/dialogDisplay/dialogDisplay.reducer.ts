import { Action, createReducer, on } from '@ngrx/store';
import {
  setChangeAccountNumberDialogDisplay,
  setChangePasswordDialogDisplay,
  setChangeUsernameDialogDisplay,
  setAddSubOrderDialogDisplay,
  setTransactionDetailsDialogDisplay,
  setDialogDisplayAction,
  setDetailOrderDialogDisplay,
  setBillDetailsDialogDisplay,
  setBillPaymentDialogDisplay,
} from './dialogDisplay.actions';
import { DialogDisplayState, initialState } from './dialogDisplay.state';

const _dialogDisplayReducer = createReducer(
  initialState,
  on(setChangeUsernameDialogDisplay, (state, action) => {
    return {
      ...state,
      changeUsernameDialogDisplay: action.display,
    };
  }),
  on(setChangePasswordDialogDisplay, (state, action) => {
    return {
      ...state,
      changePasswordDialogDisplay: action.display,
    };
  }),
  on(setChangeAccountNumberDialogDisplay, (state, action) => {
    return {
      ...state,
      changeAccountNumberDialogDisplay: action.display,
    };
  }),
  on(setAddSubOrderDialogDisplay, (state, action) => {
    return {
      ...state,
      addSubOrderDialogDisplay: action.display,
    };
  }),
  on(setTransactionDetailsDialogDisplay, (state, action) => {
    return {
      ...state,
      transactionDetailsDialogDisplay: action.display,
    };
  }),
  on(setBillDetailsDialogDisplay, (state, action) => {
    return {
      ...state,
      billDetailsDialogDisplay: action.display,
    };
  }),
  on(setBillPaymentDialogDisplay, (state, action) => {
    return {
      ...state,
      billPaymentDialogDisplay: action.display,
    };
  }),
  on(setDetailOrderDialogDisplay, (state, action) => {
    return {
      ...state,
      detailOrderDialogDisplay: action.display,
    };
  }),
  on(setDialogDisplayAction, (state, action) => {
    return {
      ...state,
      dialogDisplayAction: action.action,
    };
  })
);

export function dialogDisplayReducer(
  state: DialogDisplayState | undefined,
  action: Action
) {
  return _dialogDisplayReducer(state, action);
}
