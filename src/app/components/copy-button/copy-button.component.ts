import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.css']
})
export class CopyButtonComponent implements OnInit {
  @Input() stringToBeCopy!: string;

  constructor() { }

  ngOnInit(): void {
  }

  copy(): void {
    navigator.clipboard.writeText(this.stringToBeCopy);
  }
}
