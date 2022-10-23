import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/classes/transaction';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { Response } from 'src/app/interfaces/response';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css'],
})
export class TransactionHistoryComponent implements OnInit {
  currentUser!: User;
  transactions!: Transaction[];

  constructor(
    private transactionService: TransactionService,
    private messageService: CustomMessageService
  ) {}

  ngOnInit(): void {
    this.transactionService.getTransactionsHistory().subscribe(
      (res: any) => {
        this.transactions = res.output.data.bill_transaction_list;
      },
      (error: HttpErrorResponse) => {
        this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
      }
    );
  }
}
