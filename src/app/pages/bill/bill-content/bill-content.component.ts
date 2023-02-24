import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Status } from 'src/app/classes/status';

@Component({
  selector: 'bill-content',
  templateUrl: './bill-content.component.html',
  styleUrls: ['./bill-content.component.css'],
})
export class BillContentComponent implements OnInit {
  @Input() bill!: Status;
  @Input() isPayable!: Boolean;
  @Output() onShowPaymentDialog: EventEmitter<Status> = new EventEmitter();
  @Output() onShowRelatedOrdersDialog: EventEmitter<Status> =
    new EventEmitter();

  selectedBill!: Status;

  constructor() {}

  ngOnInit(): void {}

  showPaymentDialog(event: Event, bill: Status): void {
    event.stopPropagation();
    this.selectedBill = bill;
    this.onShowPaymentDialog.emit(bill);
  }

  showRelatedOrdersDialog(bill: Status): void {
    this.selectedBill = bill;
    this.onShowRelatedOrdersDialog.emit(bill);
  }
}
