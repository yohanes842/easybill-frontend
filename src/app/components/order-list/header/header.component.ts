import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Route } from 'src/app/enums/Route';

@Component({
  selector: 'order-list-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class OrderListHeaderComponent implements OnInit {
  @Input() dv!: DataView;
  @Output() onTapMenu: EventEmitter<any> = new EventEmitter();


  tabMenus!: MenuItem[];
  activeMenu!: MenuItem;
  sortOptions!: string[];
  selectedSortOptions!: string;
  isRelevantOrder: boolean = true;

  constructor(private router: Router) {
    this.tabMenus = [
      {
        label: 'Include you',
        icon: 'pi pi-fw pi-home',
        command: () => {
          this.onTapMenu.emit(true);
        },
      },
      {
        label: 'Your order',
        icon: 'pi pi-fw pi-file',
        command: () => {
          this.onTapMenu.emit(false);
        },
      },
    ];
    this.activeMenu = this.tabMenus[0];

    this.sortOptions = [
      "ASC", "DSC"
    ]
    this.selectedSortOptions = this.sortOptions[0];
  }

  ngOnInit(): void {}

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  navigateToAddOrdersForm(): void {
    this.router.navigateByUrl(Route.ADD_ORDER_PATH);
  }

}
