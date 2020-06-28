import { UserRole } from './user.interface';
export interface SessionInterface {
    userId: number,
    userName: string,
    userFname: string,
    userMname: string,
    userLname: string,
    userLocId: number,
    userLocName: string,
    userRole: UserRole
  }