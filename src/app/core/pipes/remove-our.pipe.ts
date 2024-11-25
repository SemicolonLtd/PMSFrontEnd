import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeOur',
  standalone: true
})
export class RemoveOurPipe implements PipeTransform {

  transform(value: string): unknown {
    if (value.startsWith('Our ')) {
      return value.replace('Our ', '');
    } else {
      return value;
    }
  }

}
