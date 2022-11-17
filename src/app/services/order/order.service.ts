import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetail } from 'src/app/classes/order-detail';
import { OrderHeader } from 'src/app/classes/order-header';
import { User } from 'src/app/classes/user';
import { Response } from 'src/app/interfaces/response';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  currentOrder!: OrderHeader | null;

  public setCurrentOrder(orderHeader: OrderHeader | null): void {
    this.currentOrder = orderHeader;
    return;
  }

  public getCurrentOrder(): OrderHeader | null {
    return this.currentOrder;
  }

  public getRelevantOrders(page: number): Observable<Response<User>> {
    let params = new URLSearchParams({ page: page.toString() });

    return this.http.get<Response<User>>(
      `${env.url}/api/users/relevant-orders?${params.toString()}`
    );
  }

  public getUsersOrders(page: number): Observable<Response<User>> {
    let params = new URLSearchParams({ page: page.toString() });

    return this.http.get<Response<User>>(
      `${env.url}/api/users/users-orders?${params.toString()}`
    );
  }

  public addOrder(orderHeader: OrderHeader): Observable<Response<OrderHeader>> {
    return this.http.post<Response<OrderHeader>>(
      `${env.url}/api/orders`,
      orderHeader
    );
  }

  public getOrder(orderId: number): Observable<Response<OrderHeader>> {
    return this.http.get<Response<OrderHeader>>(
      `${env.url}/api/orders/${orderId}`
    );
  }
}
