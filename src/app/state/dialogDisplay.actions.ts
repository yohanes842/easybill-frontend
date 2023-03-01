import { createAction } from '@ngrx/store';
import { props } from '@ngrx/store';

export type Props = { display: boolean };

export const changeUsernameDialogDisplay = createAction(
  '[User Profile Page] changeUsernameDialogDisplay',
  props<Props>()
);

export const changePasswordDialogDisplay = createAction(
  '[User Profile Page] changePasswordDialogDisplay',
  props<Props>()
);

export const changeAccountNumberDialogDisplay = createAction(
  '[User Profile Page] changeAccountNumberDialogDisplay',
  props<Props>()
);
