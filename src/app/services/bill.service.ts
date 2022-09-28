import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor() {}

  // public getBills(): Observable<Bill[]> {
  //   return this.http.get<any>(`${env.url}/api/users`);
  // return this.http.get<any>(`http://10.20.158.8:8080/api/users`);
  // }
}
