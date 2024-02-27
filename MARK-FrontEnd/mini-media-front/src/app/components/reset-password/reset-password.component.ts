import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timers } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  password:any=''
  checkPasswordEntered:boolean=false
  token: any=''
  id:any=''
  showBackButton:boolean=false;
  constructor(private loginService:LoginService,private activatedRoute: ActivatedRoute,private router:Router,private spinner:NgxSpinnerService,private toastr: ToastrService,private auth:AuthService) { }

  ngOnInit(): void {
    this.showBackButton=false
    this.token=this.activatedRoute.snapshot.queryParams.token
    this.id=this.activatedRoute.snapshot.queryParams.id
   }
  resetPassword(){
    this.password.length<=0?this.checkPasswordEntered=true:this.checkPasswordEntered=false
    if(this.password.length>0){
      let obj={
        "token":this.token,
        "userId":this.id,
        "password":this.password
    }
    this.spinner.show()
      this.loginService.resetPassword(obj).subscribe((resp:any)=>{
        this.spinner.hide()
        if(resp.status==='error'){
          this.toastr.error(resp.message)
        }else{
          this.toastr.success(resp.message)
          this.auth.removeSession()
          this.router.navigate([""])
          this.showBackButton=true
          // this.backToLogin()
        }
      })
    }else{

    }
  }
  backToLogin(){
    this.router.navigate([""])
  }

}
