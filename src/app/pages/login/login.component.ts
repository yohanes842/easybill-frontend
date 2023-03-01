import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/classes/login-form';
import { ResponseStatus } from 'src/app/enums/ResponseStatus';
import { Route } from 'src/app/enums/Route';
import { Severity } from 'src/app/enums/Severity';
import { ErrorResponse } from 'src/app/interfaces/error-response';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: LoginForm = new LoginForm();

  constructor(
    private authService: AuthService,
    private messageService: CustomMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submitLogin(): void {
    if (!this.user.username || !this.user.password) {
      this.messageService.showMessage(
        Severity.ERROR,
        'INPUT ERROR',
        'Username/password can not be empty'
      );
    } else
      this.authService.login(this.user).subscribe(
        () => {
          this.router.navigateByUrl(Route.HOME_PATH);
          this.messageService.showMessage(Severity.SUCCESS, 'LOGIN SUCCESS');
        },
        (err: ErrorResponse) => {
          let { code, message } = err;
          let errMsg;
          switch (code) {
            case ResponseStatus.USER_NOT_FOUND:
            case ResponseStatus.INVALID_CREDENTIALS:
              errMsg = 'Username or password invalid!';
              break;
            default:
              errMsg = message;
              break;
          }
          this.messageService.showMessage(
            Severity.ERROR,
            'LOGIN ERROR',
            errMsg
          );
        }
      );
  }
}
