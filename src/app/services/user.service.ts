import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    console.log(this.http.get<User[]>(`http://192.168.100.93:8080/api/users`));
    return this.http.get<User[]>(`http://192.168.100.93:8080/api/users`);
  }
}
