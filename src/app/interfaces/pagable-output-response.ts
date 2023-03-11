export interface PagableOutputResponse<T> {
  data: T;
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}
