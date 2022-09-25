import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderDetail } from 'src/app/interfaces/order-detail';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'dialog-add-sub-form',
  templateUrl: './add-sub-form.component.html',
  styleUrls: ['./add-sub-form.component.css'],
})
export class AddSubFormComponent implements OnInit {
  @Input() filteredUsernames!: string[];
  @Input() subOrder!: OrderDetail;
  @Input() modalType!: string;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onSearchKeyChange: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  display: boolean = true;
  headerTitle!: string;

  constructor() {}

  ngOnInit(): void {
    this.headerTitle =
      this.modalType === 'add' ? 'Add New Sub-Order' : 'Edit Sub-Order';
  }

  search(keyword: string): void {
    this.onSearchKeyChange.emit(keyword);
  }

  submitSubOrder(): void {
    this.onSubmit.emit();
  }

  hideDialog(): void {
    this.onClose.emit(null);
  }
}
