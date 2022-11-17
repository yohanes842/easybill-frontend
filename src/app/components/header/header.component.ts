import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VERSION } from 'src/app/easybill.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  currentUser!: User;
  version: string = VERSION;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser() as User;
  }

  ngOnInit(): void {}
}
