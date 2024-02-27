import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { FormsModule } from '@angular/forms';
import { SpinnersAngularModule } from 'spinners-angular'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AngularEmojisModule } from 'angular-emojis';
import { TabsComponent } from './components/layout/tabs/tabs.component';
import { TabLayoutComponent } from './components/layout/tab-layout/tab-layout.component';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    HomePageComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfilePageComponent,
    TabsComponent,
    TabLayoutComponent
  ],
  imports: [
    AngularEmojisModule,
    FormsModule,
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SpinnersAngularModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(), // ToastrModule added
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
