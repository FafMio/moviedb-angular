import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {
  transform(value: any, size: number): any {
    if (value !== null) {
      if (value.length <= size) {
        console.log('c\'est plut petit');
        return value;
      } else {
        return value.substring(0, size) + ' ...';
      }
    }
  }
}
