import { Injectable } from '@angular/core';
import { LazyLoadPaging } from 'src/app/classes/lazy-load-paging';

@Injectable({
  providedIn: 'root',
})
export class LazyLoadService<T> {
  constructor() {}

  currentLazyPaging!: LazyLoadPaging<T>;

  setCurrentLazyPaging(lazyPaging: LazyLoadPaging<T>): void {
    this.currentLazyPaging = lazyPaging;
  }

  incrementPageFetchIndicator(): number {
    return ++this.currentLazyPaging.pageFetchIndicator;
  }

  calculateMaxScroll(): number {
    this.currentLazyPaging.maxScroll =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    return this.currentLazyPaging.maxScroll;
  }

  isNeedLazyLoad(): boolean {
    return (
      window.scrollY / this.currentLazyPaging.maxScroll >= 0.9 &&
      this.currentLazyPaging.pageFetchIndicator <
        this.currentLazyPaging.nextPage
    );
  }
}
