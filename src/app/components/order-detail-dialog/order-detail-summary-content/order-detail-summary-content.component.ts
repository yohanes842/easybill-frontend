import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderHeader } from 'src/app/classes/order-header';
import { AppState } from 'src/app/state/app.state';
import { getSelectedOrder } from 'src/app/state/currentSelected/currentSelected.selectors';

@Component({
  selector: 'order-detail-summary-content',
  templateUrl: './order-detail-summary-content.component.html',
  styleUrls: ['./order-detail-summary-content.component.css'],
})
export class OrderDetailSummaryContentComponent implements OnInit {
  @Input() selectedOrder: OrderHeader;

  constructor(private store: Store<Pick<AppState, 'dialogDisplay'>>) {
    this.store
      .select(getSelectedOrder)
      .subscribe((res) => (this.selectedOrder = res));
  }

  ngOnInit() {}
}
