import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Route } from '../../constant/Route';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  pageTitle!: string;

  constructor(private router: Router, private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.changePageTitle(this.router.url); 
    this.commonService.title$.subscribe(res => this.pageTitle = res); 
  }
}
