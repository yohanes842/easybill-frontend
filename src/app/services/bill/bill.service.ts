import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Bill } from 'src/app/classes/bill';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient) {}

  public getBillsPayable(): Observable<Bill[]> {
    return this.http.get<any>(`${env.url}/api/bills/payable`);
  }

  public getBillsReceivable(): Observable<Bill[]> {
    return this.http.get<any>(`${env.url}/api/bills/receivables`);
  }
}
