import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TabsComponent } from './components/layout/tabs/tabs.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LoginActivateGuard } from './login-activate.guard';

const routes: Routes = [
  {
    path:"",
    // redirectTo:'login',
    component:LoginComponentComponent,
    pathMatch: 'full'
  },
  {
    path:"home",
    component:HomePageComponent,
    canActivate:[LoginActivateGuard]
  },
  {
    path:"forgot-password",
    component:ForgotPasswordComponent
  },
  {
    path:'reset-password',
    component:ResetPasswordComponent
  },
  {
    path:'profile-page',
    component:ProfilePageComponent,
    canActivate:[LoginActivateGuard]
  },
  {path:'nav',
component:TabsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
