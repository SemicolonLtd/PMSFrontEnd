import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textSlice',
  standalone: true
})
export class TextSlicePipe implements PipeTransform {

  transform(value: string, type: string, length: number): any {
    if (type === 'title' && value.length > length) {
      return value.slice(0, length) + '...';
    } else if (type === 'desc' && value.length > length) {
      return value.slice(0, length) + '...';
    } else {
      return value;
    }
  }
}
