import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {
 

  constructor(private authService:AuthService,private router:Router){

  }

  /**
   * Para evitar que el usuario recargue la pagina
   * @param route 
   * @param state 
   * @returns 
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean > | Promise<boolean> | boolean  {
     return this.authService.verificaAutenticacion()
     .pipe(
       tap( estaAutenticado => {
         if(!estaAutenticado){
           this.router.navigate(['./auth/login']);
         }
       } )
     );
  }

  /**
   * Sirve para prevenir que el usuario vaya de una ruta a otra sin loguearse
   * @param route 
   * @param segments 
   * @returns 
   */
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean>  | boolean  {

      return this.authService.verificaAutenticacion()
      .pipe(
        tap( estaAutenticado => {
          if(!estaAutenticado){
            this.router.navigate(['./auth/login']);
          }
        } )
      );
    
    
  }
}
