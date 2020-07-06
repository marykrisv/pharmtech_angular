<?php
class UserModel {
    //DB stuff
    private $conn;
    private $table = 'user';
    private $viewtable = 'currentusers';

    //User Properties
    public $userId;
    public $userName;
    public $userPassword;
    public $userFname;
    public $userMname;
    public $userLname;
    public $userGender;
    public $userBirthdate;
    public $userAddress;
    public $userCitizenship;
    public $userContactNo;
    public $userRole;
    public $userLicenseNo;
    public $userStatus;
    public $userIsNew;
    public $userLocId;
    public $userCreatedOn;
    public $userCreatedBy;
    public $userModifiedOn;
    public $userModifiedBy;
    public $userDeleted;

    public $searchBy;
    public $search;

    public $limit;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    public function checkUsernameAdd() {
        //create query
        $query = 'SELECT userName from '.$this->viewtable.'
                    WHERE
                        userName=:userName
                    LIMIT 1';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->userName = htmlspecialchars(strip_tags($this->userName));

        //bind data
        $stmt->bindParam(':userName', $this->userName);

        //execute
        $stmt->execute();

        return $stmt;
    }

    public function checkUsernameUpdate() {
        //create query
        $query = 'SELECT userName from '.$this->viewtable.'
                    WHERE
                        userName=:userName and userId!=:userId
                    LIMIT 1';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->userName = htmlspecialchars(strip_tags($this->userName));
        $this->userId = htmlspecialchars(strip_tags($this->userId));

        //bind data
        $stmt->bindParam(':userName', $this->userName);
        $stmt->bindParam(':userId', $this->userId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    public function updateUserInformation() {
        //create query
        $query = 'UPDATE '.$this->table.'
                SET
                    userName = :userName,
                    userFname = :userFname,
                    userMname = :userMname,
                    userLname = :userLname,
                    userGender = :userGender,
                    userBirthdate = :userBirthdate,
                    userAddress = :userAddress,
                    userCitizenship = :userCitizenship,
                    userContactNo = :userContactNo,
                    userRole = :userRole,
                    userLicenseNo = :userLicenseNo,
                    userLocId = :userLocId,
                    userModifiedBy = :userModifiedBy,
                    userModifiedOn = :userModifiedOn
                WHERE
                    userId = :userId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->userName = htmlspecialchars(strip_tags($this->userName));
        $this->userFname = htmlspecialchars(strip_tags($this->userFname));
        $this->userMname = htmlspecialchars(strip_tags($this->userMname));
        $this->userLname = htmlspecialchars(strip_tags($this->userLname));
        $this->userGender = htmlspecialchars(strip_tags($this->userGender));
        $this->userBirthdate = htmlspecialchars(strip_tags($this->userBirthdate));
        $this->userAddress = htmlspecialchars(strip_tags($this->userAddress));
        $this->userCitizenship = htmlspecialchars(strip_tags($this->userCitizenship));
        $this->userContactNo = htmlspecialchars(strip_tags($this->userContactNo));
        $this->userRole = htmlspecialchars(strip_tags($this->userRole));
        $this->userLicenseNo = htmlspecialchars(strip_tags($this->userLicenseNo));
        $this->userLocId = htmlspecialchars(strip_tags($this->userLocId));
        $this->userModifiedBy = htmlspecialchars(strip_tags($this->userModifiedBy));
        $this->userModifiedOn = htmlspecialchars(strip_tags($this->userModifiedOn));
        $this->userId = htmlspecialchars(strip_tags($this->userId));


        //bind data
        $stmt->bindParam(':userName', $this->userName);
        $stmt->bindParam(':userFname', $this->userFname);
        $stmt->bindParam(':userMname', $this->userMname);
        $stmt->bindParam(':userLname', $this->userLname);
        $stmt->bindParam(':userGender', $this->userGender);
        $stmt->bindParam(':userBirthdate', $this->userBirthdate);
        $stmt->bindParam(':userAddress', $this->userAddress);
        $stmt->bindParam(':userCitizenship', $this->userCitizenship);
        $stmt->bindParam(':userContactNo', $this->userContactNo);
        $stmt->bindParam(':userRole', $this->userRole);
        $stmt->bindParam(':userLicenseNo', $this->userLicenseNo);
        $stmt->bindParam(':userLocId', $this->userLocId);
        $stmt->bindParam(':userModifiedBy', $this->userModifiedBy);
        $stmt->bindParam(':userModifiedOn', $this->userModifiedOn);
        $stmt->bindParam(':userId', $this->userId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //view by role
    public function viewByStatusAllLocation () {
        //create query
        $query = 'SELECT COUNT(*) OVER () as total, c.*
                FROM '.$this->viewtable.' c
                WHERE userStatus=?
                LIMIT 0, '.$this->limit;
        
        $this->userStatus = htmlspecialchars(strip_tags($this->userStatus));

        $params = array($this->userStatus);
        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);

        return $stmt;
    }

    //view by role
    public function viewByStatusOneLocation () {
        //create query
        $query = 'SELECT COUNT(*) OVER () as total, c.*
                FROM '.$this->viewtable.' c
                WHERE userStatus=?
                and userLocId=?
                LIMIT 0, '.$this->limit;

        $this->userStatus = htmlspecialchars(strip_tags($this->userStatus));
        $this->userLocId = htmlspecialchars(strip_tags($this->userLocId));

        $params = array($this->userStatus, $this->userLocId);
        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);

        return $stmt;
    }

    //search user
    public function viewSearchOneLocation () {
        //create query
        $query = 'SELECT COUNT(*) OVER () as total, c.*
                FROM '.$this->viewtable.' c
                WHERE '.$this->searchBy.' LIKE ?
                and userLocId=?
                LIMIT 0, '.$this->limit;

        $params = array("$this->search%", $this->userLocId);
        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);

        return $stmt;
    }

    //search user
    public function viewSearchAllLocation () {
        //create query
        $query = 'SELECT COUNT(*) OVER () as total, c.*
                FROM '.$this->viewtable.' c
                WHERE '.$this->searchBy.' LIKE ?
                LIMIT 0, '.$this->limit;

        $params = array("$this->search%");
        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);

        return $stmt;
    }

    //chnage user status
    public function resetPassword() {
        //create query
        $query = 'UPDATE '.$this->table.'
                SET
                    userPassword = sha2(:userPassword,512),
                    userIsNew = 1,
                    userModifiedOn = :userModifiedOn,
                    userModifiedBy = :userModifiedBy
                WHERE
                    userId = :userId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->userId = htmlspecialchars(strip_tags($this->userId));
        $this->userPassword = htmlspecialchars(strip_tags($this->userPassword));
        $this->userModifiedOn = htmlspecialchars(strip_tags($this->userModifiedOn));
        $this->userModifiedBy = htmlspecialchars(strip_tags($this->userModifiedBy));
        
        //bind data
        $stmt->bindParam(':userId', $this->userId);
        $stmt->bindParam(':userPassword', $this->userPassword);
        $stmt->bindParam(':userModifiedOn', $this->userModifiedOn);
        $stmt->bindParam(':userModifiedBy', $this->userModifiedBy);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //chnage user status
    public function updateStatus() {
        //create query
        $query = 'UPDATE '.$this->table.'
                SET
                    userStatus = :userStatus,
                    userModifiedOn = :userModifiedOn,
                    userModifiedBy = :userModifiedBy
                WHERE
                    userId = :userId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->userId = htmlspecialchars(strip_tags($this->userId));
        $this->userStatus = htmlspecialchars(strip_tags($this->userStatus));
        $this->userModifiedOn = htmlspecialchars(strip_tags($this->userModifiedOn));
        $this->userModifiedBy = htmlspecialchars(strip_tags($this->userModifiedBy));
        
        //bind data
        $stmt->bindParam(':userId', $this->userId);
        $stmt->bindParam(':userStatus', $this->userStatus);
        $stmt->bindParam(':userModifiedOn', $this->userModifiedOn);
        $stmt->bindParam(':userModifiedBy', $this->userModifiedBy);

        //execute
        $stmt->execute();

        return $stmt;
    }


    //delete user - set userDeleted = 1
    public function deleteUser() {
        //create query
        $query = 'UPDATE '.$this->table.'
                SET
                    userDeleted = 1,
                    userModifiedOn = :userModifiedOn,
                    userModifiedBy = :userModifiedBy
                WHERE
                    userId = :userId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->userId = htmlspecialchars(strip_tags($this->userId));
        $this->userModifiedOn = htmlspecialchars(strip_tags($this->userModifiedOn));
        $this->userModifiedBy = htmlspecialchars(strip_tags($this->userModifiedBy));
        
        //bind data
        $stmt->bindParam(':userId', $this->userId);
        $stmt->bindParam(':userModifiedOn', $this->userModifiedOn);
        $stmt->bindParam(':userModifiedBy', $this->userModifiedBy);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //Get users
    public function viewAllFromAllLocation  () {
        //create query
        $query = 'SELECT COUNT(*) OVER () as total, c.*
                    FROM '.$this->viewtable.' c
                    LIMIT 0, '.$this->limit;

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //bind ID
        $stmt->bindParam(1, $this->userId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //Get users
    public function viewAllFromOneLocation  () {
        //create query
        $query = 'SELECT COUNT(*) OVER () as total, c.*
                    FROM '.$this->viewtable.' c
                    WHERE
                        userLocId=?
                    LIMIT 0, '.$this->limit;

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //bind ID
        $stmt->bindParam(1, $this->userLocId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //get single user
    public function viewUserDetail() {
        $query = 'select * from '.$this->viewtable.' 
                WHERE
                    userId=?';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //bind ID
        $stmt->bindParam(1, $this->userId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    // create user
    public function create() {
        //create query
        $query = 'INSERT INTO '.$this->table.'
                VALUES
                    (null, 
                    :userName, 
                    sha2(:userPassword), 
                    :userFname,
                    :userMname,
                    :userLname,
                    :userGender,
                    :userBirthdate,
                    :userAddress,
                    ';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->userName = htmlspecialchars(strip_tags($this->userName));
        $this->userFname = htmlspecialchars(strip_tags($this->userFname));
        $this->userLname = htmlspecialchars(strip_tags($this->userLname));

        //bind data
        $stmt->bindParam(':userName', $this->userName);
        $stmt->bindParam(':userFname', $this->userFname);
        $stmt->bindParam(':userLname', $this->userLname);

        //execute
        if ($stmt->execute()) {
            return true;
        }

        //print error if something goes wrong
        printf("Error: %s. \n", $stmt->error);

        return false;
    }

    // create user
    public function createNewUser() {
        //create query
        $query = 'INSERT INTO '.$this->table.'
                VALUES
                    (null, 
                    :userName, 
                    sha2(:userPassword, 512), 
                    :userFname,
                    :userMname,
                    :userLname,
                    :userGender,
                    :userBirthdate,
                    :userAddress,
                    :userCitizenship,
                    :userContactNo,
                    :userRole,
                    :userLicenseNo,
                    :userStatus,
                    :userIsNew,
                    :userLocId,
                    null,
                    :userCreatedBy,
                    null,
                    0,
                    0)
                    ';

        

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->userName = htmlspecialchars(strip_tags($this->userName));
        $this->userPassword = htmlspecialchars(strip_tags($this->userPassword));
        $this->userFname = htmlspecialchars(strip_tags($this->userFname));
        $this->userMname = htmlspecialchars(strip_tags($this->userMname));
        $this->userLname = htmlspecialchars(strip_tags($this->userLname));
        $this->userGender = htmlspecialchars(strip_tags($this->userGender));
        $this->userBirthdate = htmlspecialchars(strip_tags($this->userBirthdate));
        $this->userAddress = htmlspecialchars(strip_tags($this->userAddress));
        $this->userCitizenship = htmlspecialchars(strip_tags($this->userCitizenship));
        $this->userContactNo = htmlspecialchars(strip_tags($this->userContactNo));
        $this->userRole = htmlspecialchars(strip_tags($this->userRole));
        $this->userLicenseNo = htmlspecialchars(strip_tags($this->userLicenseNo));
        $this->userStatus = htmlspecialchars(strip_tags($this->userStatus));
        $this->userIsNew = htmlspecialchars(strip_tags($this->userIsNew));
        $this->userLocId = htmlspecialchars(strip_tags($this->userLocId));
        $this->userCreatedBy = htmlspecialchars(strip_tags($this->userCreatedBy));


        //bind data
        $stmt->bindParam(':userName', $this->userName);
        $stmt->bindParam(':userPassword', $this->userPassword);
        $stmt->bindParam(':userFname', $this->userFname);
        $stmt->bindParam(':userMname', $this->userMname);
        $stmt->bindParam(':userLname', $this->userLname);
        $stmt->bindParam(':userGender', $this->userGender);
        $stmt->bindParam(':userBirthdate', $this->userBirthdate);
        $stmt->bindParam(':userAddress', $this->userAddress);
        $stmt->bindParam(':userCitizenship', $this->userCitizenship);
        $stmt->bindParam(':userContactNo', $this->userContactNo);
        $stmt->bindParam(':userRole', $this->userRole);
        $stmt->bindParam(':userLicenseNo', $this->userLicenseNo);
        $stmt->bindParam(':userStatus', $this->userStatus);
        $stmt->bindParam(':userIsNew', $this->userIsNew);
        $stmt->bindParam(':userLocId', $this->userLocId);
        $stmt->bindParam(':userCreatedBy', $this->userCreatedBy);

        //execute
        $stmt->execute();
        $this->userId = $this->conn->lastInsertId();

        return $stmt;
    }

    // login
    public function login() {
        //create query
        $query = 'SELECT * FROM user
                    JOIN location ON userLocId = location.locId
                    JOIN privilege ON userId = privilege.priUserId
                    WHERE
                        userName=:userName 
                        and userPassword=sha2(:userPassword, 512) 
                        and userDeleted=0 limit 1';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->userName = htmlspecialchars(strip_tags($this->userName));
        $this->userPassword = htmlspecialchars(strip_tags($this->userPassword));
        
        //bind data
        $stmt->bindParam(':userName', $this->userName);
        $stmt->bindParam(':userPassword', $this->userPassword);

        //execute
        $stmt->execute();

        return $stmt;
    }

    // update user
    public function update() {
        //create query
        $query = 'UPDATE '.$this->table.'
                SET
                    userName = :userName,
                    userFname = :userFname,
                    userLname = :userLname
                WHERE
                    userId = :userId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->userId = htmlspecialchars(strip_tags($this->userId));
        $this->userName = htmlspecialchars(strip_tags($this->userName));
        $this->userFname = htmlspecialchars(strip_tags($this->userFname));
        $this->userLname = htmlspecialchars(strip_tags($this->userLname));

        //bind data
        $stmt->bindParam(':userName', $this->userName);
        $stmt->bindParam(':userFname', $this->userFname);
        $stmt->bindParam(':userLname', $this->userLname);
        $stmt->bindParam(':userId', $this->userId);

        //execute
        if ($stmt->execute()) {
            return true;
        }

        //print error if something goes wrong
        printf("Error: %s. \n", $stmt->error);

        return false;
    }

    // update user new password
    public function confirmNewPassword() {
        //create query
        $query = 'UPDATE '.$this->table.'
                SET
                    userPassword = sha2(:userPassword, 512),
                    userIsNew = 0 
                WHERE
                    userId = :userId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->userId = htmlspecialchars(strip_tags($this->userId));
        $this->userPassword = htmlspecialchars(strip_tags($this->userPassword));
        //bind data
        $stmt->bindParam(':userId', $this->userId);
        $stmt->bindParam(':userPassword', $this->userPassword);

        //execute
        $stmt->execute();

        return $stmt;
    }

    // update user
    public function delete() {
        //create query
        $query = 'DELETE FROM '.$this->table.'
                WHERE userId = :userId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->userId = htmlspecialchars(strip_tags($this->userId));

        //bind data
        $stmt->bindParam(':userId', $this->userId);

        //execute
        if ($stmt->execute()) {
            return true;
        }

        //print error if something goes wrong
        printf("Error: %s. \n", $stmt->error);

        return false;
    }
}
?>