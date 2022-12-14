import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomErrorResponse } from 'src/app/classes/error-response';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'change-username-dialog',
  templateUrl: './change-username-dialog.component.html',
  styleUrls: ['./change-username-dialog.component.css'],
})
export class ChangeUsernameDialogComponent implements OnInit {
  @Input() currentUser!: User;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  @Output() onSubmit: EventEmitter<string> = new EventEmitter();

  display: boolean = true;

  currentPasswordString: string = '';
  newUsernameString: string = '';
  errors: Map<string, string> = new Map();

  constructor(
    private messageService: CustomMessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  hideDialog(): void {
    this.onClose.emit();
  }

  submit(): void {
    if (this.newUsernameString == this.currentUser.username) {
      this.messageService.showMessage(
        Severity.ERROR,
        'INPUT ERROR',
        'Username must be different'
      );
    } else {
      this.userService
        .changeUserUsername(this.currentPasswordString, this.newUsernameString)
        .subscribe(
          () => {
            this.errors = new Map();
            this.messageService.showMessage(
              Severity.SUCCESS,
              'CHANGE USERNAME SUCCESS'
            );
            this.currentUser.username = this.newUsernameString.toLowerCase();
            localStorage.setItem(
              'currentUser',
              JSON.stringify(this.currentUser)
            );
            this.hideDialog();
          },
          (error: CustomErrorResponse) => {
            const res = error.extra_message.match(/[A-z ]+\[(.+)\]/);
            const content = res![1];

            this.errors = new Map();
            content.split(',').forEach((s) => {
              const [key, value] = s.split(':');
              this.errors.set(key, value);
            });

            this.messageService.showMessage(
              Severity.ERROR,
              error.code.replace(/_/g, ' ')
            );
          }
        );
    }
  }
}
