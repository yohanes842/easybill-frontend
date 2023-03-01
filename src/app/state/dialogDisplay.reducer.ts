import { createReducer, on } from '@ngrx/store';
import {
  changeAccountNumberDialogDisplay,
  changePasswordDialogDisplay,
  changeUsernameDialogDisplay,
} from './dialogDisplay.actions';
import { initialState } from './dilaogDisplay.state';

const _dialogDisplayReducer = createReducer(
  initialState,
  on(changeUsernameDialogDisplay, (state, action) => {
    return {
      ...state,
      usernameDialogDisplay: action.display,
    };
  }),
  on(changePasswordDialogDisplay, (state, action) => {
    return {
      ...state,
      passwordDialogDisplay: action.display,
    };
  }),
  on(changeAccountNumberDialogDisplay, (state, action) => {
    return {
      ...state,
      accountNumberDialogDisplay: action.display,
    };
  })
);

export function dialogDisplayReducer(state: any, action: any) {
  return _dialogDisplayReducer(state, action);
}
