import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  //pure: false
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    if (!heroe.id && !heroe.alt_img) {
      return 'assets/no-image.png';
    } else if ( heroe.alt_img != undefined ) {
      return heroe.alt_img;
    } else {

      const url =`assets/heroes/${heroe.id}.jpg`;
      return url;
    }

  }

}
