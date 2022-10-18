import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/enums/Route';
import { Severity } from 'src/app/enums/Severity';
import { Bill } from 'src/app/classes/bill';
import { BillService } from 'src/app/services/bill/bill.service';
import { CommonService } from 'src/app/services/common/common.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
  providers: [BillService],
})
export class BillComponent implements OnInit {
  display!: boolean;
  billsPayable!: Bill[];
  billsReceivable!: Bill[];
  selectedBill!: Bill;

  constructor(
    private billService: BillService,
    private commonService: CommonService,
    private messageService: CustomMessageService
  ) {}

  ngOnInit() {
    this.commonService.changePageTitle(Route.BILL_PATH);

    this.billService.getBillsPayable().subscribe(
      (res: any) => {
        this.billsPayable = res.output.data.users_bills;
      },
      (error: HttpErrorResponse) => {
        this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
      }
    );
    this.billService.getBillsReceivable().subscribe(
      (res: any) => {
        this.billsReceivable = res.output.data.users_bills;
      },
      (error: HttpErrorResponse) => {
        this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
      }
    );
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  showDialog(bill: Bill) {
    console.log(bill);
    this.selectedBill = bill;
    this.display = true;
  }
  hideDialog() {
    this.display = false;
  }
}
