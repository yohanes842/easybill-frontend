import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderHeader } from 'src/app/classes/order-header';
import { UserPendingOrders } from 'src/app/classes/user-pending-orders';
import { UserOrders } from 'src/app/classes/userOrders';
import { OutputResponse } from 'src/app/interfaces/output-response';
import { PagableOutputResponse } from 'src/app/interfaces/pagable-output-response';
import { Response } from 'src/app/interfaces/response';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  viewedOrders: Map<Number, OrderHeader> = new Map();

  constructor(private http: HttpClient) {}

  public getCurrentOrder(): OrderHeader | null {
    const stringOfCurrentOrder = localStorage.getItem('currentOrder');

    //Set currentOrder retrieving process
    if (stringOfCurrentOrder) return JSON.parse(stringOfCurrentOrder);
    else return null;
  }

  public setViewedOrder(orderId: Number, orderHeader: OrderHeader) {
    this.viewedOrders.set(orderId, orderHeader);
  }

  public getViewedOrder(orderId: Number) {
    return this.viewedOrders.get(orderId);
  }

  public getRelevantOrders(page: number, keyword: string, status: string) {
    let params = new URLSearchParams({
      page: page.toString(),
      q: keyword,
      status: status,
    });

    return this.http.get<Response<PagableOutputResponse<UserOrders>>>(
      `${env.url}/api/orders/relevant-orders?${params.toString()}`
    );
  }

  public getUsersOrders(page: number, keyword: string, status: string) {
    let params = new URLSearchParams({
      page: page.toString(),
      q: keyword,
      status: status,
    });

    return this.http.get<Response<PagableOutputResponse<UserOrders>>>(
      `${env.url}/api/orders/users-orders?${params.toString()}`
    );
  }

  public approveOrder(orderId: number) {
    return this.http.put<Response<OutputResponse<void>>>(
      `${env.url}/api/orders/${orderId}/validity`,
      {}
    );
  }

  public deleteOrder(orderId: number) {
    return this.http.delete<Response<OutputResponse<void>>>(
      `${env.url}/api/orders/${orderId}`,
      {}
    );
  }

  public getPendingOrders() {
    return this.http.get<Response<OutputResponse<UserPendingOrders>>>(
      `${env.url}/api/orders/pending-orders`
    );
  }

  public addOrder(orderHeader: OrderHeader) {
    return this.http.post<Response<OutputResponse<OrderHeader>>>(
      `${env.url}/api/orders`,
      orderHeader
    );
  }

  public getOrder(orderId: number) {
    return this.http.get<Response<OutputResponse<OrderHeader>>>(
      `${env.url}/api/orders/${orderId}`
    );
  }

  public reOrder(orderId: number) {
    return this.http.get<Response<OutputResponse<OrderHeader>>>(
      `${env.url}/api/orders/reorder/${orderId}`
    );
  }
}
