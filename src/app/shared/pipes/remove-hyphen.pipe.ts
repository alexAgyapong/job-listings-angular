import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHyphen'
})
export class RemoveHyphenPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (value) {
      return value.replace(/-/g, ' ');
    }
  }

}
