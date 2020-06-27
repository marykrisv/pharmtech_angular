import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name: 'age'
})
export class AgePipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if (!value) {
            return null;
        } else {
            var bday = new Date(value);
            var ageDifMs = Date.now() - bday.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
    }
}