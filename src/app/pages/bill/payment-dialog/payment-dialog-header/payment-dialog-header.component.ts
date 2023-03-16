import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Status } from 'src/app/classes/status';
import { AppState } from 'src/app/state/app.state';
import { getSelectedBill } from 'src/app/state/currentSelected/currentSelected.selectors';

@Component({
  selector: 'payment-dialog-header',
  templateUrl: './payment-dialog-header.component.html',
  styleUrls: ['./payment-dialog-header.component.css'],
})
export class PaymentDialogHeaderComponent implements OnInit {
  selectedBill: Status;

  constructor(private store: Store<Pick<AppState, 'dialogDisplay'>>) {
    this.store
      .select(getSelectedBill)
      .subscribe((res) => (this.selectedBill = res));
  }

  ngOnInit() {}
}
