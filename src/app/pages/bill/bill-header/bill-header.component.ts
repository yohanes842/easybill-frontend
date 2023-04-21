import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'bill-header',
  templateUrl: './bill-header.component.html',
  styleUrls: ['./bill-header.component.css'],
})
export class BillHeaderComponent implements OnInit {
  @Output() onTapMenu = new EventEmitter<boolean>();

  tabMenus!: MenuItem[];
  activeMenu!: MenuItem;
  isYourBills!: boolean;

  constructor() {
    this.tabMenus = [
      {
        label: 'Your bills',
        command: () => {
          this.isYourBills = true;
          this.onTapMenu.emit(this.isYourBills);
        },
      },
      {
        label: 'Others bills to you',
        command: () => {
          this.isYourBills = false;
          this.onTapMenu.emit(this.isYourBills);
        },
      },
    ];
    this.activeMenu = this.tabMenus[0];
  }

  ngOnInit(): void {}
}
