import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/constant/Route';
import { Severity } from 'src/app/constant/Severity';
import { Bill } from 'src/app/interfaces/bill';
import { OrderHeader } from 'src/app/interfaces/order-header';
import { BillService } from 'src/app/services/bill.service';
import { CommonService } from 'src/app/services/common.service';
import { CustomMessageService } from 'src/app/services/custom-message.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
  providers: [BillService],
})
export class BillComponent implements OnInit {
  bills!: Bill[];

  constructor(
    private billService: BillService,
    private commonService: CommonService,
    private messageService: CustomMessageService
  ) {}

  ngOnInit() {
    this.commonService.changePageTitle(Route.BILL_PATH);

    this.billService.getBills().subscribe(
      (res: any) => {
        this.bills = res.output.data.user_bills;
      },
      (error: HttpErrorResponse) => {
        this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
      }
    );
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
