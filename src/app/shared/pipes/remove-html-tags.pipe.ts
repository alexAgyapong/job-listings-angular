import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHtmlTags'
})
export class RemoveHtmlTagsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value) { return value.replace(/<[^>]*>/g, ''); }
  }

}
