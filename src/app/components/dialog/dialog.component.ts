import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Props } from 'src/app/state/dialogDisplay/dialogDisplay.actions';
import { getDialogDisplayAction } from 'src/app/state/dialogDisplay/dialogDisplay.selectors';

@Component({
  selector: 'popup-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  @Input() display: boolean = true;
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();

  @Input() customStyle: any;
  popupStateAction: (actionProps: Props) => Action;

  defaultStyle = {
    width: 'calc(100vw - 2rem)',
    'max-width': '30rem',
    overflow: 'visible',
  };

  constructor(private store: Store<Pick<AppState, 'currentSelected'>>) {
    this.store
      .select(getDialogDisplayAction)
      .subscribe((res) => (this.popupStateAction = res));
  }

  ngOnInit() {}

  hideDialog() {
    this.store.dispatch(this.popupStateAction({ display: false }));
    this.displayChange.emit(this.display);
  }
}
