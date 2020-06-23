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

        // if ($stmt->execute()) {
        //     return true;
        // }

        // //print error if something goes wrong
        // printf("Error: %s. \n", $stmt->error);

        // return false;
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