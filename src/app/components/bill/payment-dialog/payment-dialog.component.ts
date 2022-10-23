import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Severity } from 'src/app/enums/Severity';
import { Status } from 'src/app/classes/status';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { BillService } from 'src/app/services/bill/bill.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css'],
})
export class PaymentDialogComponent implements OnInit {
  @Input() selectedBill!: Status;
  @Output() onPay: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  display: boolean = true;
  amount!: number;

  constructor(
    private billService: BillService,
    private messageService: CustomMessageService
  ) {}

  ngOnInit(): void {
    this.amount = this.selectedBill.owe_amount;
  }

  hideDialog(): void {
    this.onClose.emit();
  }

  pay(): void {
    if (this.amount <= this.selectedBill.owe_amount) {
      this.billService
        .payBill(this.amount, this.selectedBill.user.id!)
        .subscribe(
          (res: any) => {
            this.messageService.showMessage(
              Severity.SUCCESS,
              'Successfully',
              'done payment!'
            );
          },
          (error: HttpErrorResponse) => {
            this.messageService.showMessage(
              Severity.ERROR,
              'REQUEST ERROR Payment failed!'
            );
          }
        );
      let params: { bill: Status; amount: number } = {
        bill: this.selectedBill,
        amount: this.amount,
      };
      this.onPay.emit(params);
      this.hideDialog();
    } else {
      this.messageService.showMessage(
        Severity.ERROR,
        'Payment Error',
        'Payment amount is invalid!'
      );
    }
    this.hideDialog();
  }
}
