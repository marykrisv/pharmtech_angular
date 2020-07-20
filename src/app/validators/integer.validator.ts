import { AbstractControl, ValidationErrors } from '@angular/forms';  

export class IntegerValidator {

    static isInteger (control: AbstractControl) : ValidationErrors | null {
        var interger = control.value as number;

        if (interger%1 != 0) {
            return { 
                isInteger: true, 
                errorMessage: 'Invalid integer.'
            }
        }

        return null;      
    }
}