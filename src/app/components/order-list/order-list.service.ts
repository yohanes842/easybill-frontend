import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { OrderHeader } from './order-list';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {}

  getProductsSmall() {
    return this.http
      .get<any>('assets/products-small.json')
      .toPromise()
      .then((res) => <OrderHeader[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getProducts() {
    return this.http
      .get<any>('assets/products-small.json')
      .toPromise()
      .then((res) => <OrderHeader[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getProductsWithOrdersSmall() {
    return this.http
      .get<any>('assets/products-small.json')
      .toPromise()
      .then((res) => <OrderHeader[]>res.data)
      .then((data) => {
        return data;
      });
  }
}
