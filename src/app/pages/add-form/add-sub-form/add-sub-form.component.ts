import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderDetail } from 'src/app/classes/order-detail';
import { Severity } from 'src/app/enums/Severity';
import { SubOrderModalType } from 'src/app/enums/SubOrderModalType';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { AppState } from 'src/app/state/app.state';
import { setAddSubOrderDialogDisplay } from 'src/app/state/dialogDisplay/dialogDisplay.actions';

@Component({
  selector: 'add-sub-form',
  templateUrl: './add-sub-form.component.html',
  styleUrls: ['./add-sub-form.component.css'],
})
export class AddSubFormComponent implements OnInit {
  @Input() modalType: string;
  @Input() subOrders: OrderDetail[];
  @Input() subOrderInAction: OrderDetail;
  @Output() onSuccess: EventEmitter<any> = new EventEmitter();

  constructor(
    private messageService: CustomMessageService,
    private store: Store<Pick<AppState, 'currentSelected'>>
  ) {}

  ngOnInit() {}

  submitSubOrder() {
    if (this.modalType == SubOrderModalType.ADD) {
      this.subOrders.push(this.subOrderInAction);
      this.subOrderInAction.users = [];

      this.messageService.showMessage(
        Severity.SUCCESS,
        '',
        'Successfully added new sub-order "' +
          this.subOrderInAction.order_menu_desc +
          '"'
      );
    } else
      this.messageService.showMessage(
        Severity.SUCCESS,
        '',
        'Successfully edited "' + this.subOrderInAction.order_menu_desc + '"'
      );

    this.onSuccess.emit();
    this.store.dispatch(setAddSubOrderDialogDisplay({ display: false }));
  }
}
