import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PercentValidator {

    static isPercentInvalid(control: AbstractControl) : ValidationErrors | null {
        var percent = control.value as string;
        percent = percent.replace("%", "");

        if (/^[0-9]+(\.)?[0-9]*$/.test(percent)) {
            return null;
        } else {
            return {
                isPercentInvalid: true,
                errorMessage: 'Percent is invalid'
            }
        }
    }
}