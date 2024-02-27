import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  checkEmailEntered:boolean=false;
  email:any=''
  constructor(private forgot:LoginService,private router:Router,private spinner:NgxSpinnerService,private toastr: ToastrService,private auth:AuthService) { }

  ngOnInit(): void {
  }
  sendRecoveryLink(){ 
    this.email.length<=0?this.checkEmailEntered=true:this.checkEmailEntered=false
    if(this.email.length>0){
      this.spinner.show()
      let obj={
        "email":this.email
    }
      this.spinner.show()
      this.forgot.recoverPassword(obj).subscribe((resp:any)=>{
        this.spinner.hide()
        if(resp.status==="success"){
          this.toastr.success(resp.message)
          this.email=''
        }else{
          this.toastr.error(resp.message)
        }
      })
    }
  }

  returnLogin(){
    this.email=''
    this.router.navigate([""])
  }

}
