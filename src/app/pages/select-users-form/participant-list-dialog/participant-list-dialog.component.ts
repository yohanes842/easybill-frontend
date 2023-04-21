import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderDetail } from 'src/app/classes/order-detail';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'participant-list-dialog',
  templateUrl: './participant-list-dialog.component.html',
  styleUrls: ['./participant-list-dialog.component.css'],
})
export class ParticipantListDialogComponent implements OnInit {
  @Input() subOrder!: OrderDetail;
  @Output() onDeleteParticipant = new EventEmitter<User>();
  @Output() onCloseDialog = new EventEmitter<void>();

  display: Boolean = true;

  constructor() {}

  ngOnInit() {}

  hideDialog() {
    this.display = false;
    this.onCloseDialog.emit();
  }

  deleteParticipant(user: User) {
    this.onDeleteParticipant.emit(user);
  }
}
