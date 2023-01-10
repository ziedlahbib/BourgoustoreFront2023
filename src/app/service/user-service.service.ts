import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  registartionurlUrl="/api/registration";
  getbyusernameurl="/api/user/get-userbyusername";
  constructor(private http : HttpClient) { }
  registration(user :User): Observable<User>{
    return this.http.post<User>(`${this.registartionurlUrl}`,user);
  }
  getuserbyusername(username:String): Observable<User>{
    return this.http.get<User>(`${this.getbyusernameurl}/${username}`);

  }
}
