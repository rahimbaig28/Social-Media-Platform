import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  userDetails: any;
  showTab:boolean=false;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.showTab=false;
    this.userDetails=this.auth.getLoginDetails()
    console.log(this.userDetails,"det")
    if(this.userDetails!==null || this.userDetails!==undefined){
      this.showTab=true;
    }

  }
  title = 'mini-media-front';
}
