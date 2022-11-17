import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() onSeeDetails: EventEmitter<Transaction> = new EventEmitter();
  currentUser!: User;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser() as User;
  }

  ngOnInit(): void {}

  showDialog(transaction: Transaction): void {
    this.onSeeDetails.emit(transaction);
  }
}
