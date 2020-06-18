<?php
class UserModel {
    //DB stuff
    private $conn;
    private $table = 'user_sample';

    //Post Properties
    public $userId;
    public $username;
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
    public $userModifiedBy;
    public $userDeleted;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    //Get users
    public function read () {
        //create query
        $query = 'select * from '.$this->table;
        //prepare statement
        $stmt = $this->conn->prepare($query);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //get single user
    public function read_single() {
        $query = 'select * from '.$this->table.' where userId = ?';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //bind ID
        $stmt->bindParam(1, $this->userId);

        //execute
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        //set properties
        $this->userId = $row['userId'];
        $this->userName = $row['userName'];
        $this->userFname = $row['userFname'];
        $this->userLname = $row['userLname'];
    }

    // create user
    public function create() {
        //create query
        $query = 'INSERT INTO '.$this->table.'
                SET
                    userName = :userName,
                    userFname = :userFname,
                    userLname = :userLname';

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