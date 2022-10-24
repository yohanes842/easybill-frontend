import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Status } from 'src/app/classes/status';

@Component({
  selector: 'bill-content',
  templateUrl: './bill-content.component.html',
  styleUrls: ['./bill-content.component.css'],
})
export class BillContentComponent implements OnInit {
  @Input() bills!: Status[];
  @Input() isPayable!: Boolean;
  @Output() onShowDialog: EventEmitter<any> = new EventEmitter();

  displayPaymentDialog: boolean = false;
  displayRelatedOrdersDialog: boolean = false;
  selectedBill!: Status;

  constructor() {}

  ngOnInit(): void {}

  showPaymentDialog(bill: Status): void {
    this.selectedBill = bill;
    this.displayPaymentDialog = true;
  }

  showRelatedOrdersDialog(bill: Status): void {
    this.selectedBill = bill;
    this.displayRelatedOrdersDialog = true;
  }

  hideDialog() {
    this.displayPaymentDialog = false;
    this.displayRelatedOrdersDialog = false;
  }

  payBill({ bill, amount }: { bill: Status; amount: number }): void {
    if (amount < bill.owe_amount) {
      bill.owe_amount -= amount;
    } else if (amount == bill.owe_amount) {
      let index = this.bills.indexOf(bill);
      this.bills.splice(index, 1);
    }
    this.hideDialog();
  }
}
