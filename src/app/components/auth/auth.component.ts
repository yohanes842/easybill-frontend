import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from 'src/app/constant/Route';
import { Severity } from 'src/app/constant/Severity';
import { LoginForm } from 'src/app/interfaces/login-form';
import { AuthService } from 'src/app/services/auth.service';
import { CustomMessageService } from 'src/app/services/custom-message.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
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
        (res) => {
          console.log(res);
          localStorage.setItem('currentUser', res.output.data.access_token);
          this.router.navigateByUrl(Route.HOME_PATH);
          this.messageService.showMessage(
            Severity.SUCCESS,
            'Sucessfully',
            'Login'
          );
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.showMessage(
            Severity.ERROR,
            'REQUEST ERROR',
            'Login failed'
          );
        }
      );
    }
  }
}
