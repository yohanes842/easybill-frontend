import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderDetail } from 'src/app/classes/order-detail';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';

@Component({
  selector: 'dialog-add-sub-form',
  templateUrl: './add-sub-form.component.html',
  styleUrls: ['./add-sub-form.component.css'],
})
export class AddSubFormComponent implements OnInit {
  @Input() filteredUsernames!: string[];
  @Input() users!: User[];
  @Input() modalType!: string;
  @Input() selectedUser!: User;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onSearchKeyChange: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  display: boolean = true;
  headerTitle!: string;
  subOrder!: OrderDetail;

  constructor(private messageService: CustomMessageService) {
    this.subOrder = new OrderDetail();
  }

  ngOnInit(): void {
    this.headerTitle =
      this.modalType === 'add' ? 'Add Sub-Order' : 'Edit Sub-Order';

    this.subOrder.username = this.selectedUser.username;
  }

  search(keyword: string): void {
    this.onSearchKeyChange.emit(keyword);
  }

  submitSubOrder(): void {
    this.subOrder.user_id = this.selectedUser.id;

    if (this.modalType === 'add') {
      this.selectedUser!.sub_order_list!.push(this.subOrder);
    }

    this.messageService.showMessage(
      Severity.SUCCESS,
      'Successfully',
      this.modalType === 'add' ? 'added new sub-order' : 'edit sub-order'
    );
    this.onClose.emit();
  }

  hideDialog(): void {
    this.onClose.emit();
  }
}
