import { OrderHeader } from "./order-header";

export interface User {
  id?: number;
  username: string;
  order_list?: OrderHeader[];
}
