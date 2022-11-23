import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  changePasswordDialogDisplay!: boolean;
  editAccountNumberDialogDisplay!: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser();
  }

  back(): void {
    history.back();
  }

  showChangePasswordDialog(): void {
    this.changePasswordDialogDisplay = true;
  }

  showEditAccountNumberDialog(): void {
    this.editAccountNumberDialogDisplay = true;
  }

  hideDialog(): void {
    this.changePasswordDialogDisplay = false;
    this.editAccountNumberDialogDisplay = false;
  }
}
