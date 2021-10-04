import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'image',
  pure:false
})
export class ImagePipe implements PipeTransform {

  transform(hero: Heroe): string {


    if(!hero.id && !hero.alt_img){
      return `assets/no-image.png`;
    }else if(hero.alt_img){
      return hero.alt_img;
    }else{
      return `assets/heroes/${hero.id}.jpg`;
    }


  }

}
