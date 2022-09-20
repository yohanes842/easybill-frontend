
import { NodeWithI18n } from "@angular/compiler";
import { OrderDetail } from "./order-detail";
import { User } from "./user"

export class OrderHeader {
    id?: number;
    orderBy?: string;
    orderAt?: Date;
    orderDescription!: string;
    totalPayment!: number;
    user!: User;
    upto!: number;
    discount!: number;
    orderDetailList!: OrderDetail[];
}