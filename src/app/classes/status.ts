import { User } from './user';

export class Status {
  id!: number;
  status!: string;
  owe_amount!: number;
  total_paid!: number;
  owe!: User;
  user!: User;
}
