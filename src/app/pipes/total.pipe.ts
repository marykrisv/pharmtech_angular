import { Pipe, PipeTransform } from '@angular/core';
import { isNull } from 'util';

@Pipe ({
    name: 'total'
})
export class TotalPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if (isNull(value)) {
            return 0;
        } else {
            return value as number;
        }
    }
}