import { Component, Input, OnInit } from '@angular/core';
import { Status } from 'src/app/classes/status';

@Component({
  selector: 'payment-dialog-header',
  templateUrl: './payment-dialog-header.component.html',
  styleUrls: ['./payment-dialog-header.component.css'],
})
export class PaymentDialogHeaderComponent implements OnInit {
  @Input() selectedBill!: Status;

  constructor() {}

  ngOnInit(): void {}
}
