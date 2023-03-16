import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Status } from 'src/app/classes/status';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/app/state/app.state';
import { getSelectedBill } from 'src/app/state/currentSelected/currentSelected.selectors';
import { setDetailOrderDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.actions';
import { getDetailOrderDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.selectors';

@Component({
  selector: 'bill-details-dialog',
  templateUrl: './bill-details-dialog.component.html',
  styleUrls: ['./bill-details-dialog.component.css'],
})
export class BillDetailsDialogComponent implements OnInit {
  currentUser: User;
  selectedBill: Status;
  isDetailSection: Observable<boolean>;
  isPayable!: boolean; //untuk mengkondisikan header pada payable dan juga receivable

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.authService
      .getAuthUser()
      .subscribe((user) => (this.currentUser = user));

    this.store
      .select(getSelectedBill)
      .subscribe((res) => (this.selectedBill = res));
    this.isDetailSection = this.store.select(getDetailOrderDialogDisplay);

    this.isPayable =
      this.selectedBill.related_order_header[0].buyer.id ===
      this.selectedBill.user.id;
  }

  ngOnInit() {
    this.store.dispatch(setDetailOrderDialogDisplay({ display: false }));
  }

  backToRelatedOrders() {
    this.store.dispatch(setDetailOrderDialogDisplay({ display: false }));
  }
}
