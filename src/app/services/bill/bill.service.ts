import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Response } from 'src/app/interfaces/response';
import { Status } from 'src/app/classes/status';
import { User } from 'src/app/classes/user';
import { Transaction } from 'src/app/classes/transaction';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient) {}

  public getBillsPayable(): Observable<Response<User>> {
    return this.http.get<Response<User>>(`${env.url}/api/bills/payable`);
  }

  public getBillsReceivable(): Observable<Response<User>> {
    return this.http.get<Response<User>>(`${env.url}/api/bills/receivables`);
  }

  public payBill(
    amount: number,
    userId: number
  ): Observable<Response<Transaction>> {
    let params = {
      amount: amount,
      user_id: userId,
    };
    return this.http.post<Response<Transaction>>(
      `${env.url}/api/bill-transactions`,
      params
    );
  }
}
