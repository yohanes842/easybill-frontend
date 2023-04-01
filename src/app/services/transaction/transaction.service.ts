import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTransactions } from 'src/app/classes/userTransactions';
import { PagableOutputResponse } from 'src/app/interfaces/pagable-output-response';
import { Response } from 'src/app/interfaces/response';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  public getTransactionsHistory(page: number) {
    let params = new URLSearchParams({ page: page.toString() });
    return this.http.get<Response<PagableOutputResponse<UserTransactions>>>(
      `${env.url}/api/bill-transactions/history?${params.toString()}`
    );
  }
}
