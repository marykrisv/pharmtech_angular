export interface UserInterface {
    userId?: number,
    userName: string,
    userPassword: string,
    userFname: string,
    userMname?: string,
    userLname: string,
    userGender: string,
    userBirthdate: Date,
    userAddress: string,
    userCitizenship: string,
    userContactNo?: string,
    userRole: string,
    userLicenseNo?: string,
    userStatus?: UserStatus,
    userIsNew: boolean,
    userLocId: number
    userCreatedOn?: Date,
    userCreatedBy: number,
    userModifiedOn?: Date,
    userModifiedBy?: number,
    locName?: string
}

export enum UserStatus {
    Active = 'Active', 
    Locked = 'Locked',
    Deactivated = 'Deactivated'
}