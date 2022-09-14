import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '../../constant/Route';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  pageTitle!: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.onSetHeaderTitle(this.router.url);
  }

  onSetHeaderTitle(path: Route | string){
    if(path == Route.HomePath){
      this.pageTitle = 'Order History';
    }else{
      this.pageTitle = 'Your Bill';
    }
  }

}
