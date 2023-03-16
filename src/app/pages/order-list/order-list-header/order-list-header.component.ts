import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Route } from 'src/app/enums/Route';

@Component({
  selector: 'order-list-header',
  templateUrl: './order-list-header.component.html',
  styleUrls: ['./order-list-header.component.css'],
})
export class OrderListHeaderComponent implements OnInit {
  @Output() onTapMenu: EventEmitter<any> = new EventEmitter();
  @Output() onChangeStatusFilter: EventEmitter<any> = new EventEmitter();
  @Output() onKeywordInput: EventEmitter<string> = new EventEmitter();

  tabMenus: MenuItem[];
  activeMenu: MenuItem;
  statusOptions: string[];
  selectedStatusOptions: string;
  isRelevantOrder: boolean = true;
  keyword: string = '';

  timeout: NodeJS.Timeout;

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

    this.statusOptions = ['ALL', 'PAID', 'UNPAID'];
    this.selectedStatusOptions = this.statusOptions[0];
  }

  ngOnInit() {}

  getValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }

  navigateToAddOrdersForm() {
    this.router.navigateByUrl(Route.ADD_ORDER_PATH);
  }

  changeStatusFilter() {
    this.onChangeStatusFilter.emit(this.selectedStatusOptions);
  }

  searchOrder() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.onKeywordInput.emit(this.keyword);
    }, 500);
  }
}
