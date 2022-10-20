import { User } from "./user";

export class Status {
  id!: number;
  status!: string;
  owe_amount!: number;
  owe!: User;
  user!: User;
}
