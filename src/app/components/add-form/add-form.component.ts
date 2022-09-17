import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
  styles: ['span { width: 3rem !important; }'],
})
export class AddFormComponent implements OnInit {
  qty: number = 1;
  display: boolean = false;
  orderAt: Date = new Date();

  constructor() {}

  ngOnInit(): void {}

  showAddModal() {
    this.orderAt = new Date();
    this.display = true;
  }
}
