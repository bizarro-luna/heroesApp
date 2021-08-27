import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';



//Definir las rutas con los componentes(pages), de manera explicita
const routes:Routes=[

  {
    //layzyLoad para cargar rutas hijas de auth
    path:'auth',
    loadChildren:()=> import('./auth/auth.module').then( m => m.AuthModule )
  },
  //lazyLoad para cargar rutas hijas de heroes
  {
    path:'heroes',
    loadChildren:()=> import('./heroes/heroes.module').then( m => m.HeroesModule),
    //Para proteger las urls 
    canLoad:[ AuthGuard],
    canActivate:[AuthGuard]
  },
  {
    path:'404',
    component:ErrorPageComponent
  },
  {
    path:'**',
    //component:ErrorPageComponent,
    redirectTo:'404'
  }

]

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
