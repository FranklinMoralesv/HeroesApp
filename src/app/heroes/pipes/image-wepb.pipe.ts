import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageWepb',
  pure:false
})
export class ImageWepbPipe implements PipeTransform {

  transform(path:string): string {
   
    if(path.startsWith('assets') && path.endsWith('.jpg') || path.endsWith('.png')){
      let newPath=path.slice(0,-4);
      newPath=newPath+'.webp'
      return newPath;
     
    }else{
      return `${path}`;
    }

  }

}
