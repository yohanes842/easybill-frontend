import { Component, OnInit } from '@angular/core';
import { LazyLoadService } from 'src/app/services/lazy-load/lazy-load.service';

@Component({
  selector: 'jump-button',
  templateUrl: './jump-button.component.html',
  styleUrls: ['./jump-button.component.css'],
})
export class JumpButtonComponent implements OnInit {
  display: boolean = false;
  isVisible: boolean = true;
  previousScrollY: number = 0;
  timeoutToBeDisplayed!: any; //opacity 100
  timeoutToBeHidden!: any; //opacity 0
  timeoutToBeInvisible!: any; //visibility hidden

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      clearTimeout(this.timeoutToBeDisplayed);
      clearTimeout(this.timeoutToBeHidden);
      clearTimeout(this.timeoutToBeInvisible);
      this.isVisible =
        window.scrollY < this.previousScrollY && window.scrollY > 0;
      if (this.isVisible) {
        this.timeoutToBeDisplayed = setTimeout(() => (this.display = true), 10);
        this.timeoutToBeHidden = setTimeout(() => (this.display = false), 3000);
        this.timeoutToBeInvisible = setTimeout(
          () => (this.isVisible = false),
          5500
        );
      }
      this.previousScrollY = window.scrollY;
    });
  }

  toPageTop(): void {
    document.documentElement.scrollIntoView({ behavior: 'smooth' });
  }
}
