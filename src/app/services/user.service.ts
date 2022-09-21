import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env} from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<any>(`${env.url}/api/users`);
    // return this.http.get<any>(`http://10.20.158.8:8080/api/users`);
  }

  // private extractResponseData(response: Response){
  //    return response.output.data; 
  // }
}
