import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LazyLoadPaging } from 'src/app/classes/lazy-load-paging';
import { Transaction } from 'src/app/classes/transaction';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { Response } from 'src/app/interfaces/response';
import { LazyLoadService } from 'src/app/services/lazy-load/lazy-load.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css'],
})
export class TransactionHistoryComponent implements OnInit {
  currentUser!: User;
  selectedTransaction!: Transaction;
  transactions!: Transaction[];
  lazyPaging!: LazyLoadPaging<Transaction>;
  displayDialog: Boolean = false;

  onScrollEvent = () => {
    if (this.lazyLoadService.isNeedLazyLoad()) {
      this.lazyLoadService.incrementPageFetchIndicator();
      this.loadData();
    }
  };

  constructor(
    private transactionService: TransactionService,
    private messageService: CustomMessageService,
    private lazyLoadService: LazyLoadService<Transaction>
  ) {}

  ngDoCheck(): void {
    if (this.lazyLoadService.currentLazyPaging)
      this.lazyLoadService.calculateMaxScroll();
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScrollEvent);
    this.lazyPaging = new LazyLoadPaging();
    this.loadData();
  }

  loadData(): void {
    this.transactionService
      .getTransactionsHistory(this.lazyPaging.nextPage)
      .subscribe(
        (res: any) => {
          this.transactions = res.output.data.bill_transaction_list;
          this.currentUser = res.output.data;
          let latestFetchTransactions: Transaction[] = this.currentUser
            .bill_transaction_list as Transaction[];
          console.log(this.lazyPaging);
          this.lazyPaging.objects = this.lazyPaging.objects.concat([
            ...latestFetchTransactions,
          ]);
          this.lazyPaging.maxPage = res.output.total_pages;
          this.lazyPaging.pageFetchIndicator = res.output.page;
          this.lazyPaging.nextPage =
            res.output.total_pages === res.output.page &&
            res.output.total_pages != 0
              ? res.output.total_pages
              : res.output.page + 1;
          this.lazyLoadService.setCurrentLazyPaging(this.lazyPaging);
        },
        (error: HttpErrorResponse) => {
          this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
        }
      );
  }

  showDialog(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.displayDialog = true;
  }

  hideDialog(): void {
    this.displayDialog = false;
  }
}
