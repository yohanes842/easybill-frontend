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
  @Output() onSearchKeyChange: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  display: boolean = true;
  headerTitle: string = 'Add user';
  username!: string;

  constructor(private messageService: CustomMessageService) {}

  ngOnInit(): void {
    console.log(this.display);
  }

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
    }

    this.participants.push(user);
    this.hideDialog();
  }

  search(keyword: string): void {
    this.onSearchKeyChange.emit(keyword);
  }

  hideDialog(): void {
    this.onClose.emit();
  }
}
