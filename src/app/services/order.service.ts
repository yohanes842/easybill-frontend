import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { OrderHeader } from '../interfaces/order-header';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public addOrder(orderHeader: OrderHeader): Observable<OrderHeader>{
    return this.http.post<any>(`${env.url}/api/orders`, orderHeader);
  }
}
