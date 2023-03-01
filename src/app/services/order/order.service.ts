import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  viewedOrders: Map<Number, OrderHeader> = new Map();

  public setCurrentOrder(orderHeader: OrderHeader | null): void {
    this.currentOrder = orderHeader;
    return;
  }

  public getCurrentOrder(): OrderHeader | null {
    const stringOfCurrentOrder = localStorage.getItem('currentOrder');

    //Set currentOrder retrieving process
    if (stringOfCurrentOrder) return JSON.parse(stringOfCurrentOrder);
    else return null;
  }

  public setViewedOrder(orderId: Number, orderHeader: OrderHeader): void {
    this.viewedOrders.set(orderId, orderHeader);
  }

  public getViewedOrder(orderId: Number): OrderHeader | undefined {
    return this.viewedOrders.get(orderId);
  }

  public getRelevantOrders(
    page: number,
    keyword: string,
    status: string
  ): Observable<Response<User>> {
    let params = new URLSearchParams({
      page: page.toString(),
      q: keyword,
      status: status,
    });

    return this.http.get<Response<User>>(
      `${env.url}/api/orders/relevant-orders?${params.toString()}`
    );
  }

  public getUsersOrders(
    page: number,
    keyword: string,
    status: string
  ): Observable<Response<User>> {
    let params = new URLSearchParams({
      page: page.toString(),
      q: keyword,
      status: status,
    });

    return this.http.get<Response<User>>(
      `${env.url}/api/orders/users-orders?${params.toString()}`
    );
  }

  public approveOrder(orderId: number): Observable<Response<void>> {
    return this.http.put<Response<void>>(
      `${env.url}/api/orders/${orderId}/validity`,
      {}
    );
  }

  public deleteOrder(orderId: number): Observable<Response<void>> {
    return this.http.delete<Response<void>>(
      `${env.url}/api/orders/${orderId}`,
      {}
    );
  }

  public getPendingOrders(): Observable<Response<User>> {
    return this.http.get<Response<User>>(
      `${env.url}/api/orders/pending-orders`
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

  public reOrder(orderId: number): Observable<Response<OrderHeader>> {
    return this.http.get<Response<OrderHeader>>(
      `${env.url}/api/orders/reorder/${orderId}`
    );
  }
}
