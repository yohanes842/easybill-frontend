import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Status } from 'src/app/classes/status';
import { AppState } from 'src/app/state/app.state';
import { setSelectedBill } from 'src/app/state/currentSelected/currentSelected.actions';
import {
  setBillDetailsDialogDisplay,
  setBillPaymentDialogDisplay,
  setDialogDisplayAction,
} from 'src/app/state/dialogDisplay/dialogDisplay.actions';

@Component({
  selector: 'bill-content',
  templateUrl: './bill-content.component.html',
  styleUrls: ['./bill-content.component.css'],
})
export class BillContentComponent implements OnInit {
  @Input() bill: Status;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  showPaymentDialog(event: Event, bill: Status) {
    event.stopPropagation();
    this.store.dispatch(setSelectedBill({ bill: cloneDeep(bill) }));
    this.store.dispatch(setBillPaymentDialogDisplay({ display: true }));
    this.store.dispatch(
      setDialogDisplayAction({ action: setBillPaymentDialogDisplay })
    );
  }

  showRelatedOrdersDialog(bill: Status) {
    this.store.dispatch(setSelectedBill({ bill: cloneDeep(bill) }));
    this.store.dispatch(setBillDetailsDialogDisplay({ display: true }));
    this.store.dispatch(
      setDialogDisplayAction({ action: setBillDetailsDialogDisplay })
    );
  }
}
