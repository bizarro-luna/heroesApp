import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap }            from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img{
      width:100%;
      border-radius:5px;
    }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers=[
    {
      id:'DC Comics',
      desc:'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc:'Marvel - Comics'
    }

  ]

  /**
   * variable que se ocupa como datos del formunlario
   */
  heroe:Heroe={
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher:Publisher.DCComics,
    alt_img:''
  }

  constructor(private heroesService:HeroesService,
              private activatedRouter:ActivatedRoute,
              private router:Router,
              private snackBar:MatSnackBar,
              private dialog: MatDialog) { }

  /**
   * Metodo que se ejecuta al inicializar el componente
   * @returns 
   */
  ngOnInit(): void {

   console.log(this.router.url.includes('editar'));

   if(!this.router.url.includes('editar')){
     return;
   }

    this.activatedRouter.params
    .pipe(
      switchMap( ({id}) => this.heroesService.getHeroe(id)   )
    )
    .subscribe( heroe =>  this.heroe=heroe );

  }

  /**
   * Metodo para realizar registrar y actualizar registro heroe 
   */
  guardar(){
    if(this.heroe.superhero.trim().length===0){
      return;
    }

    console.log(this.heroe.id);
    if(this.heroe.id){
      //Actualizar
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe( resp => {
        console.log('Actualizando ',resp);
        this.mostrarSnackbar("Registro Actualizado");
      });
    }
    else{
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe( resp => {
        //console.log('Registrando ',resp);
        this.router.navigate(['/heroes/editar', resp.id ])
        this.mostrarSnackbar("Registro Creado");
      });
    }

 

  }

  /**
   * Metodo para borrar el registro del heroe
   */
  borrar(){
    const dialog=this.dialog.open(ConfirmarComponent,{
      width:'250px',
      data:this.heroe 
    })

    dialog.afterClosed().subscribe(
      (result) => {

        if(result){
          this.heroesService.eliminarHeroe(this.heroe.id!)
          .subscribe( resp => {
            this.router.navigate(['/heroes']); 
          
          });
        }
      }

    );
  }


  mostrarSnackbar(mensaje:string){
    this.snackBar.open(mensaje,'ok!',{
      duration: 2500
    })
  }



}
