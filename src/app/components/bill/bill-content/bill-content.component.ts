import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Status } from 'src/app/classes/status';

@Component({
  selector: 'bill-content',
  templateUrl: './bill-content.component.html',
  styleUrls: ['./bill-content.component.css']
})
export class BillContentComponent implements OnInit {
  @Input() bills!: Status[];
  @Input() isPayable!: boolean;
  @Output() onShowDialog: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  showDialog(bill: Status): void {
    this.onShowDialog.emit(bill);
  }
}
