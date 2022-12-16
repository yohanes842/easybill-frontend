import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'easybill-frontend';

  constructor(
    private primengConfig: PrimeNGConfig,
    private cd: ChangeDetectorRef,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }
}
