import { AbstractControl, ValidationErrors } from '@angular/forms';  

export class PasswordValidator {

    static isPasswordInvalid(control: AbstractControl) : ValidationErrors | null {
        var password = control.value as string;
        if (password.length < 8) {
            return { 
                isPasswordInvalid: true, 
                errorMessage: 'Password should be atleast 8 characters.'
            }
        } else if (password.search(/[a-z]/) == -1) {
            return { 
                isPasswordInvalid: true, 
                errorMessage: 'Password should have atleast 1 letter.'
            }
        } else if (password.search(/[A-Z]/) == -1) {
            return { 
                isPasswordInvalid: true, 
                errorMessage: 'Password should have atleast 1 capital letter.'
            }
        } else if (password.search(/[0-9]/) == -1) {
            return { 
                isPasswordInvalid: true, 
                errorMessage: 'Password should have atleast 1 number.'
            }
        } else {
            return null;
        }        
    }
}