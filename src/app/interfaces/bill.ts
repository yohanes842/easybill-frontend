import { User } from './user';

export class Bill {
  id?: number;
  user!: User;
  owe!: User;
  owe_total!: number;
}
