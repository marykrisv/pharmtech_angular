import { PrivilegeInterface } from 'src/app/interface/privilege.interface';
export class RoleConfig {
    static role = {
        "Super Admin": {
            priDashboard: true,
            priUser: true,
            priInventory: true,
            priManage: true,
            priPatientManagement: true,
            priPharmacyCorner: true,
            priNotification: true,
            priPos: true
        },
        "Admin": {
            priDashboard: true,
            priUser: true,
            priInventory: true,
            priManage: true,
            priPatientManagement: true,
            priPharmacyCorner: true,
            priNotification: true,
            priPos: true
        },
        "Pharmacist": {
            priDashboard: false,
            priUser: false,
            priInventory: false,
            priManage: false,
            priPatientManagement: true,
            priPharmacyCorner: true,
            priNotification: true,
            priPos: false
        },
        "Doctor": {
            priDashboard: false,
            priUser: false,
            priInventory: false,
            priManage: false,
            priPatientManagement: true,
            priPharmacyCorner: false,
            priNotification: true,
            priPos: false
        },
        "Staff": {
            priDashboard: false,
            priUser: false,
            priInventory: true,
            priManage: true,
            priPatientManagement: false,
            priPharmacyCorner: false,
            priNotification: true,
            priPos: false
        }
    }
}