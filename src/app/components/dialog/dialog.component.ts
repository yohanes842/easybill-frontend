import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'popup-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  @Input() display!: boolean;
  @Input() customStyle: any;
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter();

  defaultStyle = {
    width: 'calc(100vw - 2rem)',
    'max-width': '30rem',
    overflow: 'visible',
  };

  constructor() {}

  ngOnInit(): void {}

  hideDialog(): void {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
