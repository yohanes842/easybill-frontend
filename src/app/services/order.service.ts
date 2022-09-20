import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHeader } from '../interfaces/order-header';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public addOrder(orderHeader: OrderHeader): Observable<OrderHeader>{
    return this.http.post<any>(`http://p090whp547094.intra.bca.co.id:8081/api/orders`, orderHeader);
  }
}
