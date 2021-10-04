import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ErrorPageComponent } from '../shared/error-page/error-page.component';


const routes:Routes=[
  {
    path:'',
    component:MainComponent,
    children:[
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'signup',
        component:RegisterComponent
      },
      // {
      //   path:'**',
      //   component:ErrorPageComponent
      // },
      {
        path:'**',
        redirectTo:'login'
      },
    ]
  }
]

@NgModule({
  
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }