import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const token = JSON.parse(user).access_token; //get token
      const authRequest = req.clone({
        headers: req.headers
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + token),
      });
      // console.log('Intercepted HTTP call', authRequest);
      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }
}
