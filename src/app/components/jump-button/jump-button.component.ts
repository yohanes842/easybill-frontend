import { Component, OnInit } from '@angular/core';
import { LazyLoadService } from 'src/app/services/lazy-load/lazy-load.service';

@Component({
  selector: 'jump-button',
  templateUrl: './jump-button.component.html',
  styleUrls: ['./jump-button.component.css'],
})
export class JumpButtonComponent implements OnInit {
  display: boolean = false;

  constructor(private lazyLoadService: LazyLoadService) {}

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.display = window.scrollY > 1000;
    });
  }

  toPageTop(): void {
    document.documentElement.scrollIntoView({ behavior: 'smooth' });
  }
}
