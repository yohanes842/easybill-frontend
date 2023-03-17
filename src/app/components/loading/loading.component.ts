import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'loading-overlay',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  opacityIsFull: boolean;

  constructor(public loadingService: LoadingService) {}

  ngOnInit() {
    this.opacityIsFull = true;
  }
}
