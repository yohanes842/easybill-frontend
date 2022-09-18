import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

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

  text!: string;

  results!: string[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  showAddModal() {
    this.orderAt = new Date();
    this.display = true;
  }

  search(event: any) {
    this.userService.getUsers().subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
