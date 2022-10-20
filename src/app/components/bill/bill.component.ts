import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/enums/Route';
import { Severity } from 'src/app/enums/Severity';
import { Status } from 'src/app/classes/status';
import { BillService } from 'src/app/services/bill/bill.service';
import { CommonService } from 'src/app/services/common/common.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
  providers: [BillService],
})
export class BillComponent implements OnInit {
  display!: boolean;
  bills!: Status[];
  billsPayable!: Status[];
  billsReceivable!: Status[];
  selectedBill!: Status;

  constructor(
    private billService: BillService,
    private messageService: CustomMessageService
  ) {}

  ngOnInit() {
    this.getBillsPayable();
    this.getBillsReceivable();
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  showDialog(bill: Status) {
    this.selectedBill = bill;
    this.display = true;
  }

  hideDialog() {
    this.display = false;
  }

  getBillsPayable(): void {
    this.billService.getBillsPayable().subscribe(
      (res: any) => {
        this.billsPayable = res.output.data.users_bills;
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
        this.billsReceivable = res.output.data.users_bills;
      },
      (error: HttpErrorResponse) => {
        this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
      }
    );
  }

  changeDataViewContent(isBillsPayable: boolean): void {
    this.bills = isBillsPayable ? this.billsPayable : this.billsReceivable;
  }

  payBill(bill: Status): void {
    let billsPayableList = this.billsPayable;
    let index = billsPayableList.indexOf(bill);
    billsPayableList.splice(index, 1);
    this.hideDialog();
  }
}
