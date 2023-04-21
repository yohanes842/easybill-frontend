import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomErrorResponse } from 'src/app/classes/error-response';
import { PaymentAccount } from 'src/app/classes/payment-account';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'payment-account-card',
  templateUrl: './payment-account-card.component.html',
  styleUrls: ['./payment-account-card.component.css'],
})
export class PaymentAccountCardComponent implements OnInit {
  @Input() paymentAccount: PaymentAccount;
  @Input() paymentAccountList: PaymentAccount[];
  @Output() onSave = new EventEmitter<User>();
  @Output() onDelete = new EventEmitter<PaymentAccount>();

  isEditing = false;
  paymentAccountInAction: PaymentAccount;
  accountNumberRegex: RegExp = /[0-9]+/;

  passwordConfirmationDialogDisplay: boolean;
  errors: Map<string, string> = new Map();

  paymentAccountAction: (password: string) => void;

  constructor(
    private userService: UserService,
    private messageService: CustomMessageService
  ) {}

  ngOnInit() {
    this.isEditing =
      !this.paymentAccount.payment_account_label ||
      !this.paymentAccount.payment_account;

    this.paymentAccountInAction = { ...this.paymentAccount };
  }

  edit() {
    this.isEditing = true;
  }

  delete() {
    this.paymentAccountAction = (password: string) => {
      this.passwordConfirmationDialogDisplay = false;

      this.userService
        .deleteUserPaymentAccount(password, { ...this.paymentAccount })
        .subscribe(() => {
          this.messageService.showMessage(
            Severity.SUCCESS,
            'DELETE PAYMENT ACCOUNT SUCCESS'
          );
        });
      this.onDelete.emit(this.paymentAccount);
    };

    this.passwordConfirmationDialogDisplay = true;
  }

  save() {
    // Validating input
    this.paymentAccountInAction.payment_account_label.length < 1 ||
      this.paymentAccountInAction.payment_account_label.length > 15;

    // Validating the field must be different than before in edit process
    const isNothingChange =
      this.paymentAccount.payment_account_label ==
        this.paymentAccountInAction.payment_account_label &&
      this.paymentAccount.payment_account ==
        this.paymentAccountInAction.payment_account;

    // Validating the field must be different with entire list in add or edit process
    const existingAcc = this.paymentAccountList.filter(
      (acc) =>
        acc.payment_account_label ==
          this.paymentAccountInAction.payment_account_label &&
        acc.payment_account == this.paymentAccountInAction.payment_account
    );

    if (existingAcc.length <= 0 && !isNothingChange) {
      this.paymentAccountAction = (password: string) => {
        this.userService
          .saveUserPaymentAccount(password, {
            ...this.paymentAccountInAction,
          })
          .subscribe({
            next: (res) => {
              const user = res.output.data;

              this.passwordConfirmationDialogDisplay = false;

              this.messageService.showMessage(
                Severity.SUCCESS,
                'SAVE PAYMENT ACCOUNT SUCCESS'
              );
              this.isEditing = false;
              this.onSave.emit(user);
            },
            error: (error: CustomErrorResponse) => {
              const res = error.extra_message.match(/[A-z ]+\[(.+)\]/);
              const content = res![1];

              this.errors.clear();
              content.split(',').forEach((s) => {
                const [key, value] = s.split(':');
                this.errors.set(key, value);
              });
              this.messageService.showMessage(
                Severity.ERROR,
                'REQUEST ERROR',
                this.errors.entries().next().value[1].replace(/_/g, ' ')
              );
            },
          });
      };

      this.passwordConfirmationDialogDisplay = true;
    } else if (isNothingChange) {
      this.messageService.showMessage(
        Severity.ERROR,
        'INVALID INPUT',
        "You haven't make any changes"
      );
    } else {
      this.messageService.showMessage(
        Severity.ERROR,
        'INVALID INPUT',
        'Account label and account number already exists'
      );
    }
  }

  cancel() {
    this.isEditing = false;
    if (!this.paymentAccount.id) {
      const deletedIndex = this.paymentAccountList.findIndex(
        (acc) => acc === this.paymentAccount
      );
      this.onDelete.emit(this.paymentAccount);
    }
    this.paymentAccountInAction = { ...this.paymentAccount };
  }

  hideDialog() {
    this.passwordConfirmationDialogDisplay = false;
  }
}
