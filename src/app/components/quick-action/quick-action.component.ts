import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Severity } from 'src/app/enums/Severity';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomMessageService } from 'src/app/services/message/custom-message.service';
import { Route } from '../../enums/Route';

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

  constructor(
    private router: Router,
    private messageService: CustomMessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-sign-out',
        command: () => {
          this.authService.logout();
        },
      },
      {
        icon: 'pi pi-check-square',
        command: () => {
          this.router.navigateByUrl(Route.TRANSACTION_HISTORY_PATH);
        },
      },
      {
        icon: 'pi pi-dollar',
        command: () => {
          this.router.navigateByUrl(Route.BILL_PATH);
        },
      },
      {
        icon: 'pi pi-exclamation-circle',
        command: () => {
          this.router.navigateByUrl(Route.PENDING_ORDERS_PATH);
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
