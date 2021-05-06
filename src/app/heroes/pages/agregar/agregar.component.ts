import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
        max-height: 600px

      }

    `
  ]
})
export class AgregarComponent implements OnInit {

  s1: string = '';

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img:'',

  };

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  constructor(
    private heroesService: HeroesService ,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if ( !this.router.url.includes('editar') ) {
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroesService.getHeroeById(id) )
    )
    .subscribe((heroe) => this.heroe = heroe);

  }
  guardar() {

    if ( this.heroe.superhero.trim().length ==0 ) {
      return;
    }

    if ( this.heroe.id ) {

      this.heroesService.putActualizarHeroe(this.heroe)
        .subscribe(
          (updatedHeroe) => {
            this.mostrarSnackBar('Registro Actualizado');
          }
        );

    } else {
      this.heroesService.postAgregarHeroe(this.heroe)
      .subscribe(
        (newHeroe) => {
          this.router.navigate(["/heroes/editar", newHeroe.id])
          this.mostrarSnackBar('Registro Creado');
        }
      );
    }
  }

  borrarHeroe() {

    const dialog = this.dialog.open( ConfirmarComponent, {
      width:'250px',
      data: {...this.heroe}
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if ( result ) {

          this.heroesService.deleteBorrarHeroe(this.heroe.id!)
          .subscribe(
            (resp) => {
              this.router.navigate(['/heroes']);
            }
          );

        }
      }
    );



  }

  mostrarSnackBar(msg: string): void {

    this.snackBar.open( msg, 'ok!', {
      duration:2500
    })

  }

}
