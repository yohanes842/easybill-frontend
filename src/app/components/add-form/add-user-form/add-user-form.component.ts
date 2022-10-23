import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';

@Component({
  selector: 'dialog-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.css'],
})
export class AddUserFormComponent implements OnInit {
  @Input() filteredUsernames!: string[];
  @Input() users!: User[];
  @Input() participants!: User[];
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onSearchKeyChange: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  display: boolean = true;
  headerTitle: string = 'Add user';
  username!: string;

  constructor(private messageService: CustomMessageService) {}

  ngOnInit(): void {}

  addParticipant() {
    let user =
      this.users.find((u: User) => u.username === this.username) ?? null;

    //validate if user not exist in the list
    if (!user) {
      this.messageService.showMessage(
        Severity.ERROR,
        'Input Error',
        'User not found!'
      );
      return;
    } else if (
      this.participants.find((u: User) => u.username === user!.username)
    ) {
      this.messageService.showMessage(
        Severity.ERROR,
        'Input Error',
        'User already exist!'
      );
      return;
    }
    user.sub_order_list = [];
    this.participants.push(user);

    this.onSubmit.emit(user);
  }

  search(keyword: string): void {
    this.onSearchKeyChange.emit(keyword);
  }

  hideDialog(): void {
    this.onClose.emit();
  }
}
