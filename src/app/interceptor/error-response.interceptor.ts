import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CustomErrorResponse } from '../classes/error-response';
import { Severity } from '../enums/Severity';
import { AuthService } from '../services/auth/auth.service';
import { CustomMessageService } from '../services/message/custom-message.service';
import { ResponseStatus } from '../enums/ResponseStatus';

@Injectable()
export class ErrorResponseInterceptor implements HttpInterceptor {
  constructor(
    private messageService: CustomMessageService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          let errMsg;
          if (
            error.error instanceof ErrorEvent ||
            error.error instanceof ProgressEvent
          ) {
            errMsg = 'Connection error, please try again later';
          } else {
            const errorResponse: CustomErrorResponse = error.error.status;
            switch (error.status) {
              case 401:
              case 403:
                if (error.error.status.code != 'UNAUTHORIZED_RESOURCE_ACCESS')
                  this.authService.logout();
                errMsg = errorResponse.message;
                break;
              default:
                errMsg =
                  errorResponse.extra_message &&
                  errorResponse.code !=
                    ResponseStatus.MISSING_REQUIRED_FIELDS &&
                  errorResponse.code != ResponseStatus.INVALID_FIELDS_VALUE
                    ? errorResponse.extra_message
                    : errorResponse.message;
                break;
            }
          }
          this.messageService.showMessage(Severity.ERROR, '', errMsg);
        } else {
          console.error('something else happened');
        }
        return throwError(() => error.error.status);
      })
    );
  }
}
