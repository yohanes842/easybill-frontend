import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderHeader } from 'src/app/classes/order-header';
import { Status } from 'src/app/classes/status';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BillService } from 'src/app/services/bill/bill.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { AppState } from 'src/app/state/app.state';
import { setSelectedUser } from 'src/app/state/currentSelected/currentSelected.actions';
import { setBillPaymentDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.actions';
import {
  getBillDetailsDialogDisplay,
  getBillPaymentDialogDisplay,
} from 'src/app/state/dialogDisplay/dialogDisplay.selectors';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
  providers: [BillService],
})
export class BillComponent implements OnInit {
  bills: Status[];
  billsPayable: Status[];
  billsReceivable: Status[];

  selectedBill: Status;
  selectedOrder: OrderHeader;
  authUser: User;

  billPaymentDialogDisplay: Observable<boolean>;
  billDetailsDialogDisplay: Observable<boolean>;

  constructor(
    private billService: BillService,
    private authService: AuthService,
    private messageService: CustomMessageService,
    private store: Store<AppState>
  ) {
    this.bills = [];

    this.authService.getAuthUser().subscribe((res) => {
      this.authUser = res;

      this.billService.getBillsPayable().subscribe({
        next: (res) => {
          this.billsPayable = res.output.data.users_bills.sort(
            (bill1: Status, bill2: Status) =>
              bill2.owe_amount - bill1.owe_amount
          );
          this.bills = this.billsPayable;
          this.store.dispatch(setSelectedUser({ user: this.authUser }));
        },
        error: () => {
          this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
        },
      });
    });

    this.billService.getBillsReceivable().subscribe({
      next: (res) => {
        this.billsReceivable = res.output.data.users_bills.sort(
          (bill1: Status, bill2: Status) => bill2.owe_amount - bill1.owe_amount
        );
      },
      error: () => {
        this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
      },
    });

    this.billDetailsDialogDisplay = this.store.select(
      getBillDetailsDialogDisplay
    );
    this.billPaymentDialogDisplay = this.store.select(
      getBillPaymentDialogDisplay
    );
  }

  ngOnInit() {}

  getValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  changeDataViewContent(isBillsPayable: boolean): void {
    this.bills = isBillsPayable ? this.billsPayable : this.billsReceivable;
  }

  payBill({ bill, amount }: { bill: Status; amount: number }) {
    let index = this.bills.findIndex((b) => b.id === bill.id);
    if (amount < bill.owe_amount) this.bills[index].owe_amount -= amount;
    else if (amount == bill.owe_amount) this.bills.splice(index, 1);

    this.store.dispatch(setBillPaymentDialogDisplay({ display: false }));
  }
}
