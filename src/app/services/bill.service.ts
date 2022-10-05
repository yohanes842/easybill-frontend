import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Bill } from '../interfaces/bill';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient) {}

  public getBills(): Observable<Bill[]> {
    return this.http.get<any>(`${env.url}/api/users/bills`);
  }
}
