import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textSlice',
  standalone: true
})
export class TextSlicePipe implements PipeTransform {

  transform(value: string, type: string): any {
    if (type === 'title' && value.length > 50) {
      return value.slice(0, 50) + '...';
    } else if (type === 'desc' && value.length > 100) {
      return value.slice(0, 100) + '...';
    } else {
      return value;
    }
  }
}
