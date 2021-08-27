import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap }            from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
    img{
      width:100%;
      border-radius:5px;
    }
    `
  ]
})
export class HeroeComponent implements OnInit {

  /**
   * Variable para la pantalla
   */
  heroe!:Heroe;

  constructor(private activatedRoutes:ActivatedRoute, private heroeServicio:HeroesService, private router:Router) { }

  ngOnInit(): void {
    
    //this.activatedRoutes.params.subscribe(({id})=> console.log(id));

    this.activatedRoutes.params
    .pipe(
      switchMap(({id}) => this.heroeServicio.getHeroe(id))
      //,tap(console.log)
    )
    .subscribe( heroe => this.heroe=heroe);

  }

  /**
   * Metodo para el boton de regresar
   */
  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
