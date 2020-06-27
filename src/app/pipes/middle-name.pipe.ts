import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name: 'middlename'
})
export class MiddlenamePipe implements PipeTransform {
    transform(value: string, ...args: any[]) {
        if (!value) {
            return null;
        } else if (value == '') {
            return '';
        } else {
            return value.substr(0,1)+'.';
        }
    }
}