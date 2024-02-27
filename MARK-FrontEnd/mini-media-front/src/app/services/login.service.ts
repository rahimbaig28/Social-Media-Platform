import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  checkLogin(obj:any){
    let url="http://localhost:8080/auth/login";
    return this.http.post(url,obj)
  }

  register(obj:any){
    let url="http://localhost:8080/auth/signup";
    return this.http.post(url,obj)
  }

  recoverPassword(obj:any){
    let url ="http://localhost:8080/auth/requestResetPassword"
    return this.http.post(url,obj)
  }

  resetPassword(obj:any){
    let url="http://localhost:8080/auth/resetPassword"
    return this.http.post(url,obj)
  }
  getAccountDetailsByEmail(obj:any){
    let url="http://localhost:8080/getAccountDetailsByEmail"
    return this.http.post(url,obj)
  }

  deleteAccount(obj:any){
    let url="http://localhost:8080/deleteAccount"
    return this.http.post(url,obj)
  }
}
