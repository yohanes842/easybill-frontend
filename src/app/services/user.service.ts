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
    return this.http.get<any>(`http://p090whp547094.intra.bca.co.id:8081/api/users`);
    // return this.http.get<any>(`http://10.20.158.8:8080/api/users`);
  }

  // private extractResponseData(response: Response){
  //    return response.output.data; 
  // }
}
