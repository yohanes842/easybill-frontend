import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  pageTitle!: string;

  constructor(private router: Router, private cd: ChangeDetectorRef) {}

  ngOnInit() {}
}
