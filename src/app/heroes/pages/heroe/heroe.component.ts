import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap,tap } from 'rxjs/operators';

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img{
        width: 100%;
        border-radius: 5px
      }
    `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!:Heroe;

  constructor(
    private route: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(
      switchMap( ({ id }) => this.heroesService.getHeroeById(id)),
      tap( console.log )
    )
    .subscribe(
      (heroe) => {
        this.heroe = heroe;
      }
    );

  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }

}
