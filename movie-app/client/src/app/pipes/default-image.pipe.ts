import { Pipe, PipeTransform } from '@angular/core';
//create using ng g command
@Pipe({
  name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {

  transform(imageUrl: string, fallbackImageUrl: string): string {
  if(imageUrl && imageUrl!=""){
    return imageUrl;
  }else{

    return fallbackImageUrl;
  }
  }

}
