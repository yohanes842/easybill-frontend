import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/classes/transaction';
import { User } from 'src/app/classes/user';
import { OutputResponse } from 'src/app/interfaces/output-response';
import { Response } from 'src/app/interfaces/response';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient) {}

  public getBillsPayable() {
    return this.http.get<Response<OutputResponse<User>>>(
      `${env.url}/api/bills/payable`
    );
  }

  public getBillsReceivable() {
    return this.http.get<Response<OutputResponse<User>>>(
      `${env.url}/api/bills/receivables`
    );
  }

  public payBill(amount: number, userId: number) {
    let params = {
      amount: amount,
      user_id: userId,
    };
    return this.http.post<Response<OutputResponse<Transaction>>>(
      `${env.url}/api/bill-transactions`,
      params
    );
  }
}
