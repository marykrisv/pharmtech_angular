import { AbstractControl, ValidationErrors } from '@angular/forms';  

export class PhoneValidator {

    static isPhoneNumberValid(control: AbstractControl) : ValidationErrors | null {
        var phoneNumber = control.value as string;
        if (phoneNumber == '') {
            return {
                isPhoneNumberValid: true,
                errorMessage: 'Phone number is valid'
            }
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
                //all are numbers
                return {
                    isPhoneNumberValid: true,
                    errorMessage: 'Phone number is valid'
                }
            } else {
                return {
                    isPhoneNumberValid: false,
                    errorMessage: 'Phone number is invalid'
                }
            }
        }
        
    }
}