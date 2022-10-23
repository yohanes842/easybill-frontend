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
    this.bills = [];
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
}
