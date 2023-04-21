import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Status } from 'src/app/classes/status';
import { Severity } from 'src/app/enums/Severity';
import { BillService } from 'src/app/services/bill/bill.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { AppState } from 'src/app/state/app.state';
import { getSelectedBill } from 'src/app/state/currentSelected/currentSelected.selectors';

@Component({
  selector: 'payment-dialog-content',
  templateUrl: './payment-dialog-content.component.html',
  styleUrls: ['./payment-dialog-content.component.css'],
})
export class PaymentDialogContentComponent implements OnInit {
  @Output() onPay = new EventEmitter<{ bill: Status; amount: number }>();

  selectedBill: Status;
  amount: number;

  constructor(
    private billService: BillService,
    private messageService: CustomMessageService,
    private store: Store<Pick<AppState, 'dialogDisplay'>>
  ) {
    this.store
      .select(getSelectedBill)
      .subscribe((res) => (this.selectedBill = res));
    this.amount = this.selectedBill.owe_amount;
  }

  ngOnInit() {}

  pay() {
    if (this.amount <= this.selectedBill.owe_amount && this.amount >= 0) {
      this.billService
        .payBill(this.amount, this.selectedBill.user.id!)
        .subscribe({
          next: () => {
            this.messageService.showMessage(
              Severity.SUCCESS,
              '',
              'Successfully done payment'
            );
          },
          error: () => {
            this.messageService.showMessage(
              Severity.ERROR,
              '',
              'Payment is failed, please try again...'
            );
          },
        });
      let params: { bill: Status; amount: number } = {
        bill: this.selectedBill,
        amount: this.amount,
      };
      this.onPay.emit(params);
    } else {
      this.messageService.showMessage(
        Severity.ERROR,
        '',
        'Payment amount is invalid'
      );
    }
  }
}
