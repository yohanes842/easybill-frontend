import { currentSelectedReducer } from './currentSelected/currentSelected.reducer';
import { CurrentSelectedState } from './currentSelected/currentSelected.state';
import { dialogDisplayReducer } from './dialogDisplay/dialogDisplay.reducer';
import { DialogDisplayState } from './dialogDisplay/dialogDisplay.state';

export interface AppState {
  dialogDisplay: DialogDisplayState;
  currentSelected: CurrentSelectedState;
}

export const appReducer = {
  dialogDisplay: dialogDisplayReducer,
  currentSelected: currentSelectedReducer,
};
