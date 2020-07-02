import { AbstractControl, ValidationErrors, ValidatorFn, } from '@angular/forms';  

export class SearchUserValidator {

    // static isSearchUserInvalid (filterBy: string): ValidatorFn {

    //     return (control: AbstractControl): ValidationErrors | null => {
    //         var search = control.value as string;
    //         console.log(filterBy);

    //         return null;
    //     };
    
    // }
    static isSearchUserInvalid (control: AbstractControl): ValidationErrors | null {
        var filterBy: string[] = [
            "Username: ",
            "First Name: ",
            "Middle Name: ",
            "Last Name: ",
            "Role: "
        ];

        var search = control.value as string;
        if (search == '') {
            return null;
        }
        var i;
        for (i = 0; i < filterBy.length; i++) {
            if (search.startsWith(filterBy[i]) == true) {
                break;
            }
        }
        if (i == filterBy.length) {
            return {
                invalid: true,
                message: "Invalid search text"
            }
        }

        return null;
    
    }
}