import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Route } from 'src/app/enums/Route';

@Component({
  selector: 'order-list-header',
  templateUrl: './order-list-header.component.html',
  styleUrls: ['./order-list-header.component.css'],
})
export class OrderListHeaderComponent implements OnInit {
  @Output() onTapMenu = new EventEmitter<boolean>();
  @Output() onChangeStatusFilter = new EventEmitter<string>();
  @Output() onKeywordInput = new EventEmitter<string>();

  tabMenus: MenuItem[];
  activeMenu: MenuItem;
  statusOptions: string[];
  selectedStatusOptions: string;
  isRelevantOrder: boolean = true;
  keyword: string = '';

  timeout: NodeJS.Timeout;

  constructor(private router: Router, private route: ActivatedRoute) {
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

  ngOnInit() {
    this.keyword = this.route.snapshot.queryParamMap.get('q') ?? '';
    if (this.keyword.length > 0) this.onKeywordInput.emit(this.keyword);
  }

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
