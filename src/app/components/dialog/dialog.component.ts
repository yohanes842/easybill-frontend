import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { DialogDisplayState } from 'src/app/interfaces/dialogDisplayState';
import { Props } from 'src/app/state/dialogDisplay.actions';

@Component({
  selector: 'popup-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  @Input() display: boolean = true;
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();
  @Input() customStyle: any;
  @Input() popupStateAction!: (actionProps: Props) => Action;

  defaultStyle = {
    width: 'calc(100vw - 2rem)',
    'max-width': '30rem',
    overflow: 'visible',
  };

  constructor(private store: Store<{ dialogDisplay: DialogDisplayState }>) {}

  ngOnInit(): void {}

  hideDialog(): void {
    this.store.dispatch(this.popupStateAction({ display: false }));
    this.displayChange.emit(this.display);
  }
}
