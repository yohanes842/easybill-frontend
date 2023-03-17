import { HttpErrorResponse } from '@angular/common/http';

export class CustomErrorResponse extends HttpErrorResponse {
  code: string;
  extra_message: string;
  override message: string;
}
