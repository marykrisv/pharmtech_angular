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
    userRole: UserRole,
    userLicenseNo?: string,
    userStatus?: UserStatus,
    userIsNew: boolean,
    userLocId: number
    userCreatedOn?: Date,
    userCreatedBy: number,
    userModifiedOn?: Date,
    userModifiedBy?: number,
    locName?: string,

    //added privilege since this is now a view table
    priUserId?: number,
    priDashboard?: boolean,
    priUser?: boolean,
    priInventory?: boolean,
    priManage?: boolean,
    priPatientManagement?: boolean,
    priPharmacyCorner?: boolean,
    priNotification?: boolean,
    priPos?: boolean
}

export enum UserStatus {
    Active = 'Active', 
    Locked = 'Locked',
    Deactivated = 'Deactivated'
}

export enum UserRole {
    SuperAdmin = 'Super Admin',
    Admin = 'Admin',
    Pharmacist = 'Pharmacist',
    Doctor = 'Doctor',
    Staff = 'Staff'
}