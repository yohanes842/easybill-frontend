import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomErrorResponse } from 'src/app/classes/error-response';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'edit-account-number-form',
  templateUrl: './edit-account-number-form.component.html',
  styleUrls: ['./edit-account-number-form.component.css'],
})
export class EditAccountNumberFormComponent implements OnInit {
  @Input() currentUser!: User;
  @Output() onSuccess: EventEmitter<string> = new EventEmitter();

  errors: Map<string, string> = new Map();
  passwordString!: string;
  newAccountNumber!: string;

  constructor(
    private messageService: CustomMessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService;
    if (!this.currentUser.account_number)
      this.currentUser.account_number = 'Not set up yet';
  }

  submit(): void {
    if (this.currentUser.account_number == this.newAccountNumber) {
      this.messageService.showMessage(
        Severity.ERROR,
        'INPUT ERROR',
        'Account number must be different with the old one!'
      );
    } else {
      this.userService
        .changeUserAccountNumber(this.passwordString!, this.newAccountNumber!)
        .subscribe(
          () => {
            this.errors = new Map();
            this.messageService.showMessage(
              Severity.SUCCESS,
              'CHANGE ACCOUNT NUMBER SUCCESS'
            );
            this.currentUser.account_number = this.newAccountNumber;
            localStorage.setItem(
              'currentUser',
              JSON.stringify(this.currentUser)
            );
            this.onSuccess.emit();
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
