import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public getUserOrders(userId: number): Observable<User> {
    return this.http.get<any>(`${env.url}/api/users/relevant-orders`);
  }

  public addOrder(orderHeader: OrderHeader): Observable<OrderHeader> {
    return this.http.post<any>(`${env.url}/api/orders`, orderHeader);
  }

  public getOrder(orderId: number): Observable<OrderHeader> {
    return this.http.get<any>(`${env.url}/api/orders/${orderId}`);
  }
}
