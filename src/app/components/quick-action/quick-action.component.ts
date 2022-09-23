import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CommonService } from 'src/app/services/common.service';
import { Route } from '../../constant/Route';

@Component({
  selector: 'app-quick-action',
  templateUrl: './quick-action.component.html',
  styleUrls: ['./quick-action.component.css'],
  providers: [],
})
export class QuickActionComponent implements OnInit, AfterViewInit {
  @Output() updateUrl: EventEmitter<Route> = new EventEmitter();
  items!: MenuItem[];

  quickActionDiv!: HTMLElement;
  quickActionMainBtn!: HTMLElement;

  constructor(private router: Router, private commonService: CommonService) {}

  ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-sign-out',
        command: () => {
          alert('sign out');
        },
      },
      {
        icon: 'pi pi-user',
        command: () => {
          this.router.navigateByUrl(Route.BILL_PATH);
        },
      },
      {
        icon: 'pi pi-home',
        command: () => {
          this.router.navigateByUrl(Route.HOME_PATH);
        },
      },
    ];
  }

  ngAfterViewInit(): void {
    this.quickActionDiv = document.querySelector(
      'p-speeddial>div'
    ) as HTMLElement;
    this.quickActionMainBtn = document.querySelector(
      'p-speeddial>div>button'
    ) as HTMLElement;
    this.onHideMenu();
  }

  onHideMenu() {
    this.quickActionMainBtn.style.visibility = 'visible';
    this.quickActionDiv.style.visibility = 'hidden';
  }

  onShowMenu() {
    this.quickActionDiv.style.visibility = 'visible';
    this.quickActionMainBtn.style.visibility = 'visible';
  }
}
