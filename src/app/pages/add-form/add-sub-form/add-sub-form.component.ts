import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderDetail } from 'src/app/classes/order-detail';
import { User } from 'src/app/classes/user';
import { Severity } from 'src/app/enums/Severity';
import { SubOrderModalType } from 'src/app/enums/SubOrderModalType';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';

@Component({
  selector: 'add-sub-form',
  templateUrl: './add-sub-form.component.html',
  styleUrls: ['./add-sub-form.component.css'],
})
export class AddSubFormComponent implements OnInit {
  @Input() modalType!: string;
  @Input() subOrders!: OrderDetail[];
  @Input() selectedSubOrder!: OrderDetail;
  @Output() onSuccess: EventEmitter<any> = new EventEmitter();

  constructor(private messageService: CustomMessageService) {}

  ngOnInit(): void {}

  submitSubOrder(): void {
    if (this.modalType === SubOrderModalType.ADD) {
      this.subOrders.push(this.selectedSubOrder);
      this.selectedSubOrder.users = [];
    }

    this.messageService.showMessage(
      Severity.SUCCESS,
      'Successfully',
      this.modalType === 'add' ? 'added new sub-order' : 'edit sub-order'
    );

    this.onSuccess.emit();
  }
}
