import { AbstractControl, ValidationErrors } from '@angular/forms'; 

export class DecimalValidator {

    static isDecimal (control: AbstractControl) : ValidationErrors | null {
        var decimal = control.value as number;
        
        if (isNaN(decimal)) {
            return {
                isDecimal: false,
                errorMessage: 'Invalid Decimal.'
            }
        }

        return null;
    }
}