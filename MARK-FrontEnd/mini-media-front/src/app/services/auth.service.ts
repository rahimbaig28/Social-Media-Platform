import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email:any=''
  username:any=''
  loginDetails:any
  constructor() { }
  setLoginDetails(data:any){
    sessionStorage.setItem('loginDetails',JSON.stringify(data))
  }
  getLoginDetails(){
    this.loginDetails = sessionStorage.getItem("loginDetails")
    return JSON.parse(this.loginDetails)
  }  
  removeSession(){
    sessionStorage.clear() 
  }
}
