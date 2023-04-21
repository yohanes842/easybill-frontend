import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Status } from 'src/app/classes/status';
import { Severity } from 'src/app/enums/Severity';
import { BillService } from 'src/app/services/bill/bill.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { AppState } from 'src/app/state/app.state';
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

  billPaymentDialogDisplay: Observable<boolean>;
  billDetailsDialogDisplay: Observable<boolean>;

  constructor(
    private billService: BillService,
    private messageService: CustomMessageService,
    private store: Store<AppState>
  ) {
    this.bills = [];

    this.billService.getBillsPayable().subscribe({
      next: (res) => {
        this.billsPayable = res.output.data.users_bills.sort(
          (bill1: Status, bill2: Status) => bill2.owe_amount - bill1.owe_amount
        );
        this.bills = this.billsPayable;
      },
    });

    this.billService.getBillsReceivable().subscribe({
      next: (res) => {
        this.billsReceivable = res.output.data.users_bills.sort(
          (bill1: Status, bill2: Status) => bill2.owe_amount - bill1.owe_amount
        );
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
    let index = this.bills.findIndex((b) => b.user.id === bill.user.id);
    if (amount < bill.owe_amount) this.bills[index].owe_amount -= amount;
    else if (amount == bill.owe_amount) this.bills.splice(index, 1);

    this.store.dispatch(setBillPaymentDialogDisplay({ display: false }));
  }
}
