import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { OrderDetail } from 'src/app/classes/order-detail';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'participant-list-dialog',
  templateUrl: './participant-list-dialog.component.html',
  styleUrls: ['./participant-list-dialog.component.css'],
})
export class ParticipantListDialogComponent implements OnInit {
  @Input() subOrder!: OrderDetail;
  @Output() onDeleteParticipant: EventEmitter<any> = new EventEmitter();
  @Output() onCloseDialog: EventEmitter<User> = new EventEmitter();

  display: Boolean = true;

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {}

  hideDialog() {
    this.display = false;
    this.onCloseDialog.emit();
  }

  deleteParticipant(user: User): void {
    console.log(user);
    this.onDeleteParticipant.emit(user);
  }
}
