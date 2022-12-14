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
  changeUsernameDialogDisplay!: boolean;
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

  showChangeUsernameDialog(): void {
    this.changeUsernameDialogDisplay = true;
  }

  showChangePasswordDialog(): void {
    this.changePasswordDialogDisplay = true;
  }

  showEditAccountNumberDialog(): void {
    this.editAccountNumberDialogDisplay = true;
  }

  hideDialog(): void {
    this.changeUsernameDialogDisplay = false;
    this.changePasswordDialogDisplay = false;
    this.editAccountNumberDialogDisplay = false;
  }

  getUserDetail(): void {
    this.userService.getUserDetail().subscribe((res: Response<User>) => {
      const fetchedUser = res.output.data;

      const currentUserString = localStorage.getItem('currentUser')!;
      if (currentUserString) {
        this.currentUser = JSON.parse(currentUserString);
        this.currentUser!.account_number =
          fetchedUser.account_number ?? 'Not set up yet';
      }
    });
  }
}
