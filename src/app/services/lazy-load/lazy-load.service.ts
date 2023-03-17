import { Injectable } from '@angular/core';
import { LazyLoadPaging } from 'src/app/classes/lazy-load-paging';

@Injectable({
  providedIn: 'root',
})
export class LazyLoadService<T> {
  currentLazyPaging: LazyLoadPaging<T>;

  constructor() {}

  setCurrentLazyPaging(lazyPaging: LazyLoadPaging<T>) {
    this.currentLazyPaging = lazyPaging;
  }

  incrementPageFetchIndicator() {
    return ++this.currentLazyPaging.pageFetchIndicator;
  }

  calculateMaxScroll() {
    this.currentLazyPaging.maxScroll =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    return this.currentLazyPaging.maxScroll;
  }

  isNeedLazyLoad() {
    return (
      window.scrollY / this.currentLazyPaging.maxScroll >= 0.9 &&
      this.currentLazyPaging.pageFetchIndicator <
        this.currentLazyPaging.nextPage
    );
  }
}
