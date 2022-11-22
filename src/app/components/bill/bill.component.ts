import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/classes/status';
import { Severity } from 'src/app/enums/Severity';
import { BillService } from 'src/app/services/bill/bill.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
  providers: [BillService],
})
export class BillComponent implements OnInit {
  bills!: Status[];
  billsPayable!: Status[];
  billsReceivable!: Status[];
  selectedBill!: Status;

  displayPaymentDialog: boolean = false;
  displayRelatedOrdersDialog: boolean = false;

  constructor(
    private billService: BillService,
    private messageService: CustomMessageService
  ) {}

  ngOnInit() {
    this.bills = [];
    this.getBillsPayable();
    this.getBillsReceivable();
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  showPaymentDialog(bill: Status) {
    this.selectedBill = bill;
    this.displayPaymentDialog = true;
  }

  showRelatedOrdersDialog(bill: Status) {
    this.selectedBill = bill;
    this.displayRelatedOrdersDialog = true;
  }

  getBillsPayable(): void {
    this.billService.getBillsPayable().subscribe(
      (res: any) => {
        this.billsPayable = res.output.data.users_bills.sort(
          (bill1: Status, bill2: Status) => bill2.owe_amount - bill1.owe_amount
        );
        this.bills = this.billsPayable;
      },
      (error: HttpErrorResponse) => {
        this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
      }
    );
  }

  getBillsReceivable(): void {
    this.billService.getBillsReceivable().subscribe(
      (res: any) => {
        this.billsReceivable = res.output.data.users_bills.sort(
          (bill1: Status, bill2: Status) => bill2.owe_amount - bill1.owe_amount
        );
      },
      (error: HttpErrorResponse) => {
        this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
      }
    );
  }

  changeDataViewContent(isBillsPayable: boolean): void {
    this.bills = isBillsPayable ? this.billsPayable : this.billsReceivable;
  }

  hideDialog(): void {
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
