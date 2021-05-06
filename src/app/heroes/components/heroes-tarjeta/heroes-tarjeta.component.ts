import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroes-tarjeta',
  templateUrl: './heroes-tarjeta.component.html',
  styles: [
    `
      margin-card{
        margin-top: 20px
      }
      .min-image-size{
        min-height:400px;
      }
    `
  ]
})
export class HeroesTarjetaComponent implements OnInit {

  @Input() heroeInput!: Heroe;

  constructor() { }

  ngOnInit(): void {
  }

}
