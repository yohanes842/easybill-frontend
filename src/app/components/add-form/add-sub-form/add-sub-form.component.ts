import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderDetail } from 'src/app/interfaces/order-detail';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'dialog-add-sub-form',
  templateUrl: './add-sub-form.component.html',
  styleUrls: ['./add-sub-form.component.css'],
})
export class AddSubFormComponent implements OnInit {
  @Input() filteredUsernames!: String[];
  @Input() subOrder!: OrderDetail;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onSearchKeyChange: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  display: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  search(keyword: string) {
    this.onSearchKeyChange.emit(keyword);
  }

  submitSubOrder() {
    this.onSubmit.emit(this.subOrder);
  }

  hideDialog() {
    console.log('masuk');
    this.onClose.emit(null);
  }
}
