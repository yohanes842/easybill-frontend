export class LazyLoadPaging<T> {
  nextPage = 1;
  maxPage = 0;
  pageFetchIndicator = 0;
  maxScroll = 0;
  objects: T[] = [];
}
