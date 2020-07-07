import { Identifiers } from '@angular/compiler';

export interface DosageInterface {
    dosId?: number,
    dosAbr: string,
    dosName: string,
    dosWithConcentration: boolean,
    conCreatedOn: string,
    conCreatedBy: string,
    conModifiedOn: string,
    conModifiedBy: string,
    conDeleted: number
} 