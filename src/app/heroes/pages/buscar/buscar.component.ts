import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {


  termino:string='';
  heroes:Heroe[]=[];

 

  heroeSeleccionado!:Heroe | undefined;

  constructor(private heroesService:HeroesService) { }

  ngOnInit(): void {
    
  }

  buscando(){
   // if(this.termino.length>2){
      this.heroesService.getSugerencias(this.termino.trim())
      .subscribe( heroes => this.heroes=heroes );
    //}
  }

  opcionSeleccionada(evento:MatAutocompleteSelectedEvent ){
    
    if(!evento.option.value){
      console.log('termino vacio')
      this.heroeSeleccionado= undefined;
      return;
    } 

    const heroe:Heroe= evento.option.value;
    this.termino=heroe.superhero;
  
    this.heroesService.getHeroe(heroe.id!)
    .subscribe( heroe => this.heroeSeleccionado=heroe );

   
  }

}
