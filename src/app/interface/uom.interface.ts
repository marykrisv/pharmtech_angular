import { Identifiers } from '@angular/compiler';

export interface UomInterface {
    uomId?: number,
    uomName: string,
    uomCanBeComputed: boolean,
    uomCreatedOn: string,
    uomCreatedBy: string,
    uomModifiedOn: string,
    uomModifiedBy: string,
    uomDeleted: number
} 