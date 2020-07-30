import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'middleName'
})
export class MiddleNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    if (!value) {
      return null;
    } else if (value == '') {
        return '';
    } else {
        return value.substr(0,1)+'.';
    }
  }

}
