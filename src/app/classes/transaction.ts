import { User } from "./user";

export class Transaction{
    payer!: User;
    receiver!: User;
    paid_amount!: number;
}