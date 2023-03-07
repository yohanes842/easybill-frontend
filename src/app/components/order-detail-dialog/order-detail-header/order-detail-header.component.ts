import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderHeader } from 'src/app/classes/order-header';
import { AppState } from 'src/app/state/app.state';
import { getSelectedOrder } from 'src/app/state/currentSelected/currentSelected.selectors';

@Component({
  selector: 'order-detail-header',
  templateUrl: './order-detail-header.component.html',
  styleUrls: ['./order-detail-header.component.css'],
})
export class OrderDetailHeaderComponent implements OnInit {
  @Input() selectedOrder: OrderHeader;

  constructor(private store: Store<Pick<AppState, 'dialogDisplay'>>) {
    this.store
      .select(getSelectedOrder)
      .subscribe((res) => (this.selectedOrder = res));
  }

  ngOnInit() {}
}
