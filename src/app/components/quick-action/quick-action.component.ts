import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-quick-action',
  templateUrl: './quick-action.component.html',
  styleUrls: ['./quick-action.component.css'],
  providers: [MessageService],
})
export class QuickActionComponent implements OnInit {
  items!: MenuItem[];

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-sign-out',
        command: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Add',
            detail: 'Data Added',
          });
        },
      },
      {
        icon: 'pi pi-user',
        command: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Update',
            detail: 'Data Updated',
          });
        },
      },
      {
        icon: 'pi pi-home',
        command: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Update',
            detail: 'Data Updated',
          });
        },
      },
    ];
  }
}
