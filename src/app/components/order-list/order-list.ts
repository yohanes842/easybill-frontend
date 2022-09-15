export interface OrderHeader {
  id: number;
  buyerName: string;
  orderDescription: string;
  totalPayment: number;
  discount: number;
  upto: number;
  orders?: OrderDetail[];
  createdAt: Date;
}

export interface OrderDetail {
  id: number;
  username: string;
  description: string;
  qty: number;
  price: number;
}
