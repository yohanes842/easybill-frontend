import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/classes/transaction';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'transaction-history-detail',
  templateUrl: './transaction-history-detail.component.html',
  styleUrls: ['./transaction-history-detail.component.css'],
})
export class TransactionHistoryDetailComponent implements OnInit {
  @Input() transaction!: Transaction;
  currentUser!: User | null;

  constructor(private authService: AuthService) {
    this.currentUser = authService.getCurrentUser();
  }

  ngOnInit(): void {}
}
