import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jump-button',
  templateUrl: './jump-button.component.html',
  styleUrls: ['./jump-button.component.css'],
})
export class JumpButtonComponent implements OnInit {
  display = false;
  isVisible = true;
  previousScrollY = 0;
  timeoutToBeDisplayed!: NodeJS.Timeout; //opacity 100
  timeoutToBeHidden!: NodeJS.Timeout; //opacity 0
  timeoutToBeInvisible!: NodeJS.Timeout; //visibility hidden

  constructor() {}

  ngOnInit() {
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
      } else this.display = false;
      this.previousScrollY = window.scrollY;
    });
  }

  toPageTop() {
    document.documentElement.scrollIntoView({ behavior: 'smooth' });
  }
}
