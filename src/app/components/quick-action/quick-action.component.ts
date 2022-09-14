import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem} from 'primeng/api';
import { Route } from '../../constant/Route';

@Component({
  selector: 'app-quick-action',
  templateUrl: './quick-action.component.html',
  styleUrls: ['./quick-action.component.css'],
  providers: [],
})
export class QuickActionComponent implements OnInit {
  @Output() updateUrl: EventEmitter<Route> = new EventEmitter();
  items!: MenuItem[];
  
  constructor(private router: Router) {
    
  }

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
          this.router.navigateByUrl(Route.BillPath);
          this.updateUrl.emit(Route.BillPath);
        },
      },
      {
        icon: 'pi pi-home',
        command: () => {
          this.router.navigateByUrl(Route.HomePath);
          this.updateUrl.emit(Route.HomePath);
        }
      }
    ];
  }
}
