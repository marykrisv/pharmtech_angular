import { Identifiers } from '@angular/compiler';

export interface LocationInterface {
    locId?: number,
    locName: string,
    locDescription: string,
    locLatitude: string,
    locLongitude: string,
    locCreatedOn: string,
    locCreatedBy: string,
    locModifiedOn: string,
    locModifiedBy: string,
    locDeleted: number
} 