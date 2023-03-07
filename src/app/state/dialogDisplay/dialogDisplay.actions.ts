import { Action, createAction } from '@ngrx/store';
import { props } from '@ngrx/store';

export type Props = {
  display: boolean;
};

export const setChangeUsernameDialogDisplay = createAction(
  '[User Profile Page] setChangeUsernameDialogDisplay',
  props<Props>()
);

export const setChangePasswordDialogDisplay = createAction(
  '[User Profile Page] setChangePasswordDialogDisplay',
  props<Props>()
);

export const setChangeAccountNumberDialogDisplay = createAction(
  '[User Profile Page] setChangeAccountNumberDialogDisplay',
  props<Props>()
);

export const setAddSubOrderDialogDisplay = createAction(
  '[Add Order Page] setAddSubOrderDialogDisplay',
  props<Props>()
);

export const setTransactionDetailsDialogDisplay = createAction(
  '[Transaction History Page] setTransactionDetailsDialogDisplay',
  props<Props>()
);

export const setDetailOrderDialogDisplay = createAction(
  '[General] setTransactionDetailsDialogDisplay',
  props<Props>()
);

export const setDialogDisplayAction = createAction(
  '[General] setDialogDisplayAction',
  props<{ action: (actionProps: Props) => Action }>()
);
