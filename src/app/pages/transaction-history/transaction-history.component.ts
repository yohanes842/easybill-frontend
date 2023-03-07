import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LazyLoadPaging } from 'src/app/classes/lazy-load-paging';
import { Transaction } from 'src/app/classes/transaction';
import { Severity } from 'src/app/enums/Severity';
import { LazyLoadService } from 'src/app/services/lazy-load/lazy-load.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { AppState } from 'src/app/state/app.state';
import { getTransactionDetailsDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.selectors';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css'],
})
export class TransactionHistoryComponent implements OnInit {
  lazyPaging: LazyLoadPaging<Transaction> = new LazyLoadPaging<Transaction>();
  relatedOrderDialogDisplay$: Observable<boolean>;

  onScrollEvent = () => {
    if (this.lazyLoadService.isNeedLazyLoad()) {
      this.lazyLoadService.incrementPageFetchIndicator();
      this.loadData();
    }
  };

  constructor(
    private transactionService: TransactionService,
    private messageService: CustomMessageService,
    private lazyLoadService: LazyLoadService<Transaction>,
    private store: Store<Pick<AppState, 'currentSelected'>>
  ) {
    this.relatedOrderDialogDisplay$ = this.store.select(
      getTransactionDetailsDialogDisplay
    );
  }

  ngDoCheck() {
    if (this.lazyLoadService.currentLazyPaging)
      this.lazyLoadService.calculateMaxScroll();
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScrollEvent);
    this.loadData();
  }

  loadData() {
    this.transactionService
      .getTransactionsHistory(this.lazyPaging.nextPage)
      .subscribe({
        next: (res) => {
          const currentUser = res.output.data;
          const latestFetchTransactions = currentUser.bill_transaction_list;

          if (!latestFetchTransactions) {
            this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR');
            return;
          }

          this.lazyPaging.objects = this.lazyPaging.objects.concat([
            ...latestFetchTransactions,
          ]);
          this.lazyPaging.maxPage = res.output.total_pages!;
          this.lazyPaging.pageFetchIndicator = res.output.page!;
          this.lazyPaging.nextPage =
            res.output.total_pages === res.output.page &&
            res.output.total_pages != 0
              ? res.output.total_pages!
              : res.output.page! + 1;
          this.lazyLoadService.setCurrentLazyPaging(this.lazyPaging);
        },
        error: () =>
          this.messageService.showMessage(Severity.ERROR, 'REQUEST ERROR'),
      });
  }
}
