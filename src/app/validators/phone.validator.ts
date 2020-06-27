import { AbstractControl, ValidationErrors } from '@angular/forms';  

export class PhoneValidator {

    static isPhoneInvalid (control: AbstractControl) : ValidationErrors | null {
        var phoneNumber = control.value as string;
        if (phoneNumber == '') {
            return null;
        } else {
            var i;
            for (i = 0; i < phoneNumber.length; i++) {
                if (phoneNumber.substring(i, i+1).search(/[0-9]/) != -1) { //substring is a number
                    // do nothing
                } else  {
                    break; //break here
                }
            }
            if (i == phoneNumber.length) {
                return null;
            } else {
                return {
                    isPhoneInvalid: true,
                    errorMessage: 'Phone number is invalid'
                }
            }
        }        
    }
}