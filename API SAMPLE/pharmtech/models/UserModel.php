<?php
class UserModel {
    //DB stuff
    private $conn;
    private $table = 'user';

    //Post Properties
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
    public $userIsLocked;
    public $userIsNew;
    public $userLocId;
    public $userCreatedOn;
    public $userCreatedBy;
    public $userModifiedOn;
    public $userModifiedBy;
    public $userDeleted;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }


    //delete user - set userDeleted = 1
    public function deleteUser() {
        //create query
        $query = 'UPDATE '.$this->table.'
                SET
                    userDeleted = 1
                WHERE
                    userId = :userId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->userId = htmlspecialchars(strip_tags($this->userId));
        
        //bind data
        $stmt->bindParam(':userId', $this->userId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //get username
    public function getUsername () {
        //create query
        $query = 'SELECT created.userName as createdBy, modified.userName as modifiedBy FROM user
                LEFT JOIN user as created on user.userCreatedBy = created.userId
                LEFT JOIN user as modified on user.userModifiedBy = modified.userId
                WHERE user.userId = ?';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //bind ID
        $stmt->bindParam(1, $this->userId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //Get users
    public function viewAllFromAllLocation  () {
        //create query
        $query = 'select * from '.$this->table.' 
                JOIN
                    location on userLocId = locId 
                WHERE
                    userDeleted=0';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //bind ID
        $stmt->bindParam(1, $this->userId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //Get users
    public function viewAllFromThisLocation  () {
        //create query
        $query = 'select * from '.$this->table.' 
                JOIN
                    location on userLocId = locId 
                WHERE
                    userLocId=? and userDeleted=0';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //bind ID
        $stmt->bindParam(1, $this->userLocId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //Get users
    public function read  () {
        //create query
        $query = 'select * from user_sample';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //bind ID
        // $stmt->bindParam(1, $this->userLocId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //get single user
    public function read_single() {
        $query = 'select * from '.$this->table.' 
                JOIN
                    location on userLocId = locId 
                WHERE
                    userId=? and userLocId=? and userDeleted=0';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //bind ID
        $stmt->bindParam(1, $this->userId);
        $stmt->bindParam(2, $this->userLocId);

        //execute
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        //set properties
        $this->userId = $row['userId'];
        $this->userLocId = $row['userLocId'];
    }

    //get single user
    public function viewUserDetail() {
        $query = 'select * from '.$this->table.' 
                JOIN
                    location on userLocId = locId 
                WHERE
                    userId=? and userLocId=? and userDeleted=0';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //bind ID
        $stmt->bindParam(1, $this->userId);
        $stmt->bindParam(2, $this->userLocId);

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
                    :userIsLocked,
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
        $this->userIsLocked = htmlspecialchars(strip_tags($this->userIsLocked));
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
        $stmt->bindParam(':userIsLocked', $this->userIsLocked);
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

    // update user
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