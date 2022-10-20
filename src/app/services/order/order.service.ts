import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';
import { Response } from 'src/app/interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public getRelevantOrders(): Observable<Response<User>> {
    return this.http.get<Response<User>>(`${env.url}/api/users/relevant-orders`);
  }

  public getUsersOrders(): Observable<Response<User>> {
    return this.http.get<Response<User>>(`${env.url}/api/users/users-orders`);
  }

  public addOrder(orderHeader: OrderHeader): Observable<Response<OrderHeader>> {
    return this.http.post<Response<OrderHeader>>(`${env.url}/api/orders`, orderHeader);
  }

  public getOrder(orderId: number): Observable<Response<OrderHeader>> {
    return this.http.get<Response<OrderHeader>>(`${env.url}/api/orders/${orderId}`);
  }
}
