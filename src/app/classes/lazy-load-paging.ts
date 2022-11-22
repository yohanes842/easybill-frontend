export class LazyLoadPaging<T> {
  nextPage: number = 1;
  maxPage: number = 0;
  pageFetchIndicator: number = 0;
  maxScroll: number = 0;
  objects: T[] = [];
}
