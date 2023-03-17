import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VERSION } from 'src/app/easybill.config';
import { Route } from 'src/app/enums/Route';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  username: string;
  version: string = VERSION;

  constructor(private authService: AuthService, private router: Router) {
    this.authService
      .getAuthUser()
      .subscribe((user) => (this.username = user.username));
  }

  ngOnInit() {}

  navigateToProfile() {
    this.router.navigateByUrl(Route.PROFILE_PATH);
  }
}
