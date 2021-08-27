import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endPoint:string = environment.endPoint;
  /**
   * Usuario logeado
   */
  private _auth:Auth | undefined;


  /**
   * Metodo que retorna el usuario logeado
   */
  get auth(){
    return {...this._auth};
  }

  constructor(private http:HttpClient) { }


  /**
   * Metodo para verificar al usuario autenticado
   * @returns 
   */
  verificaAutenticacion():Observable<boolean>{

    if(!localStorage.getItem('token')){
      return of(false);
    }



    return this.http.get<Auth>(`${this.endPoint}/usuarios/1`)
     .pipe(
       map(auth => {
         this._auth= auth;
         return true;
       } )
     );
  }


  /**
   * Metodo get para validar usuario usuario
   * @param id 
   */
  login(){
    return this.http.get<Auth>(`${this.endPoint}/usuarios/1`)
    .pipe(
      tap (auth => this._auth=auth),
      tap (auth => localStorage.setItem('token',auth.id))
    );
  }

  logout(){
    this._auth=undefined;
  }


  

}
