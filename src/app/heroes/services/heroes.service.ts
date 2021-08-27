import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';
import {Observable}  from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  /**
   * URL del servicio para obtener heroes
   */
  private endPoint:string=environment.endPoint;

  constructor(private http:HttpClient) { }


 /**
  * Metodo para obtener toda la lista de heroes
  * @returns 
  */
  getHeroes():Observable<Heroe[]>{
    //El HttpClient trabaja mediante observable
    return this.http.get<Heroe[]>(this.endPoint+`/heroes`);
  }

  /**
   * Metodo para obtener un heroe por medio del id
   * @param id 
   * @returns 
   */
  getHeroe(id:string):Observable<Heroe>{

    return this.http.get<Heroe>(`${this.endPoint}/heroes/${id}`);
  }


  /**
   * Metodo para obtener sugerencias
   * @param termino  - sugerencia a buscar
   * @returns 
   */
  getSugerencias(termino:string):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.endPoint}/heroes?q=${termino}&_limit=6`);
  }

  /**
   * MetodoPost para agregar un heroe
   * @param heroe - datos a registrar
   * @returns 
   */
  agregarHeroe(heroe:Heroe):Observable<Heroe>{
    return this.http.post<Heroe>(`${this.endPoint}/heroes/`,heroe);
  }


  /**
   * Metodo Put para actualizar un heroe, se envia el id del registro a eliminar
   * @param heroe - datos actualizar
   * @returns 
   */
  actualizarHeroe(heroe:Heroe):Observable<Heroe>{
    return this.http.put<Heroe>(`${this.endPoint}/heroes/${heroe.id}`,heroe);
  }


  /**
   * Metodo Post eliminar registro de un heroe, enviado el id en la ruta
   * @param id - id del registro a eliminar
   * @returns 
   */
  eliminarHeroe(id:string):Observable<any>{
    return this.http.delete(`${this.endPoint}/heroes/${id}`);
  }

}
