import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Severity } from 'src/app/enums/Severity';
import { Bill } from 'src/app/classes/bill';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css'],
})
export class PaymentDialogComponent implements OnInit {
  @Input() selectedBill!: Bill;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  display: boolean = true;
  amount!: number;

  constructor(private messageService: CustomMessageService) {}

  ngOnInit(): void {
    this.amount = this.selectedBill.owe_amount;
  }

  hideDialog(): void {
    this.onClose.emit();
  }

  pay(): void {
    if (this.amount <= this.selectedBill.owe_amount) {
      this.messageService.showMessage(
        Severity.SUCCESS,
        'Successfully',
        'done payment!'
      );
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
