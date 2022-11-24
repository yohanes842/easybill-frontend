import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { Response } from 'src/app/interfaces/response';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  changePasswordDialogDisplay!: boolean;
  editAccountNumberDialogDisplay!: boolean;

  currentUser!: User | null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserDetail();
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

  getUserDetail(): void {
    this.userService
      .getUserDetail()
      .subscribe((res: Response<User>) => (this.currentUser = res.output.data));
  }
}
