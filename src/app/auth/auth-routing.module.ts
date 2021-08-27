import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ResgistroComponent } from './pages/resgistro/resgistro.component';



const routes:Routes=[
  {
    path:'',
    children:[
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'registro',
        component:ResgistroComponent
      },
      {
        path:'**',
        component:LoginComponent
      }
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
