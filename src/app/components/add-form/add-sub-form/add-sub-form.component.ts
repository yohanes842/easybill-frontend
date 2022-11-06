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
  @Input() subOrders!: OrderDetail[];
  @Input() selectedSubOrder!: OrderDetail;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onSearchKeyChange: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  display: boolean = true;
  headerTitle!: string;

  constructor(private messageService: CustomMessageService) {}

  ngOnInit(): void {
    this.headerTitle =
      this.modalType === 'add' ? 'Add Sub-Order' : 'Edit Sub-Order';
  }

  search(keyword: string): void {
    this.onSearchKeyChange.emit(keyword);
  }

  submitSubOrder(): void {
    if (this.modalType === 'add') {
      this.subOrders.push(this.selectedSubOrder);
      this.selectedSubOrder.users = [];
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
