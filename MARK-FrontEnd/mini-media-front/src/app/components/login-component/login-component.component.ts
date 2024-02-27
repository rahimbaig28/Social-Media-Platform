import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import $ from "jquery";
declare var $: any;

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  email:any=''
  password:any=''
  Remail:any=''
  Rpass:any=''
  Rname:any=''
  status:boolean=false;
  checkEmailEntered:boolean=false;
  checkPasswordEntered:boolean=false;
  checkRname:boolean=false;
  checkRpassword:boolean=false;
  checkRemail:boolean=false;
  constructor(private loginService: LoginService,private authService:AuthService,private router:Router,private spinner:NgxSpinnerService,private toastr: ToastrService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('loginDetails')){
      this.router.navigate(["home"])
      return;
    }
    this.checkEmailEntered=false;
    this.checkPasswordEntered=false;
    this.email='';
    this.password='';
  }
  SignInSubmit(form:any){
    this.email.length<=0?this.checkEmailEntered=true:this.checkEmailEntered=false
    this.password.length<=0?this.checkPasswordEntered=true:this.checkPasswordEntered=false
    if(this.email.length>0 && this.password.length>0){
      this.spinner.show()
      let obj={
        "email":this.email,
        "password":this.password
      }
      this.loginService.checkLogin(obj).subscribe((resp:any)=>{
        this.spinner.hide()
        if(resp.status==="Failure"){
          this.toastr.error("Please enter correct email/password")
          return
        }else{
          this.toastr.success("You are successfully logged in")
          this.authService.setLoginDetails(resp.data)
          this.email='';
          this.password='';
          this.router.navigate(['home'])
        }
      })
    }
  }
  registerSubmit(form:any){
    console.log("helo")
    this.Remail.length<=0?this.checkRemail=true:this.checkRemail=false;
    this.Rname.length<=0?this.checkRname=true:this.checkRname=false;
    this.Rpass.length<=0?this.checkRpassword=true:this.checkRpassword=false;
    if(this.Rname.length>0 && this.Remail.length>0 && this.Rpass.length>0){
      this.spinner.show()
      const obj={
        "email":this.Remail,
        "name":this.Rname,
        "password":this.Rpass
      }
      this.loginService.register(obj).subscribe((resp:any)=>{
        this.spinner.hide()
        console.log(resp,"resp")
        if(resp.status==='Failure'){
          this.toastr.error(resp.message)
        }else{
          this.toastr.success(resp.message)
          const data={
            email:resp.email,
            username:resp.name
          }
          this.authService.setLoginDetails(data)
          this.Remail=''
          this.Rpass=''
          this.Rname=''
          this.router.navigate(['home'])
        }
      })
    }
 }

  signIn(e:any){
    console.log(this.email,this.password)
  }
  rend(e:any){
     document.querySelector(".cont")?.classList.toggle("s--signup")
     this.checkEmailEntered=false;
     this.checkPasswordEntered=false;
     this.checkRemail=false;
     this.checkRname=false;
     this.checkRpassword=false;
     this.Rname='';
     this.Rpass='';
     this.Remail=''
     this.email=''
     this.password=''
  }
  forgotPassword(){
    this.router.navigate(["forgot-password"])
  }

}
