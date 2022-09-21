import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Route } from '../constant/Route';

@Injectable()
export class CommonService {
  private title = new BehaviorSubject('Order History');
  title$ = this.title.asObservable();

  changePageTitle(path: string) {
    if(path == Route.HomePath){
      this.title.next('Order History');
    }else if(path == Route.BillPath){
      this.title.next('Your Bill');
    }else {
      this.title.next('Add New Order');
    }
  }
}
