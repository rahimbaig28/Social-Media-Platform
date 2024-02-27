import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  userDetails: any;
  showTab:boolean=false;
  profileHigh:boolean=false;
  homeHigh:boolean=false;
  EnteredPass:any;
  constructor(private auth:AuthService,private router:Router,private toastr:ToastrService, private spinner:NgxSpinnerService,private account:LoginService) { }

  ngOnInit(): void {
    let curl = this.router.url
    if(curl==='/profile-page'){
      this.profileHigh = true;
    }else{
      this.homeHigh=true;
    }
    this.userDetails=this.auth.getLoginDetails()
    console.log(this.userDetails,"det")
    if(this.userDetails!==null || this.userDetails!==undefined){
      this.showTab=true;
    }

  }
  logoutclick(){
    this.auth.removeSession()
    this.router.navigate([""])
  }

  deleteAccount(){
    console.log("delete account clicked")
    $('#deleteacc').modal('show')
  }
  deleteAccClick(){
    this.spinner.show()
    let obj={
      "email":this.userDetails.email,
      "name":this.userDetails.name,
      "password":this.EnteredPass
    }
    this.account.deleteAccount(obj).subscribe((resp:any)=>{
      this.spinner.hide()
      if(resp.status==="success"){
        this.toastr.success(resp.message)
        $('#deleteacc').modal('hide')
        this.logoutclick()
      }else{
        this.toastr.error(resp.message)
      }
    })
  }

  changeclick(){this.router.navigate(["forgot-password"])}
}
