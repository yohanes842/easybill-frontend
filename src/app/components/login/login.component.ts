import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from 'src/app/enums/Route';
import { Severity } from 'src/app/enums/Severity';
import { LoginForm } from 'src/app/classes/login-form';
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
    } else {
      this.authService.login(this.user).subscribe(
        () => {
          this.router.navigateByUrl(Route.HOME_PATH);
          this.messageService.showMessage(Severity.SUCCESS, 'LOGIN SUCCESS');
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }
}
