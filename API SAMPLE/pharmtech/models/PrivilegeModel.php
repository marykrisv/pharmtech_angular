<?php
class PrivilegeModel {
    //DB stuff
    private $conn;
    private $table = 'privilege';

    //Privilege Properties
    public $priUserId;
    public $priDashboard;
    public $priUser;
    public $priInventory;
    public $priManage;
    public $priPatientManagement;
    public $priPharmacyCorner;
    public $priNotification;
    public $priPos;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    //create privilege
    public function updatePrivilege () {
        $query = 'UPDATE '.$this->table.'
                SET
                    priDashboard = :priDashboard,
                    priUser = :priUser,
                    priInventory = :priInventory,
                    priManage = :priManage,
                    priPatientManagement = :priPatientManagement,
                    priPharmacyCorner = :priPharmacyCorner,
                    priNotification = :priNotification,
                    priPos = :priPos
                WHERE
                    priUserId = :priUserId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->priUserId = htmlspecialchars(strip_tags($this->priUserId));
        $this->priDashboard = htmlspecialchars(strip_tags($this->priDashboard));
        $this->priUser = htmlspecialchars(strip_tags($this->priUser));
        $this->priInventory = htmlspecialchars(strip_tags($this->priInventory));
        $this->priManage = htmlspecialchars(strip_tags($this->priManage));
        $this->priPatientManagement = htmlspecialchars(strip_tags($this->priPatientManagement));
        $this->priPharmacyCorner = htmlspecialchars(strip_tags($this->priPharmacyCorner));
        $this->priNotification = htmlspecialchars(strip_tags($this->priNotification));
        $this->priPos = htmlspecialchars(strip_tags($this->priPos));

        //bind params
        $stmt->bindParam(':priDashboard', $this->priDashboard);
        $stmt->bindParam(':priUser', $this->priUser);
        $stmt->bindParam(':priInventory', $this->priInventory);
        $stmt->bindParam(':priManage', $this->priManage);
        $stmt->bindParam(':priPatientManagement', $this->priPatientManagement);
        $stmt->bindParam(':priPharmacyCorner', $this->priPharmacyCorner);
        $stmt->bindParam(':priNotification', $this->priNotification);
        $stmt->bindParam(':priPos', $this->priPos);
        $stmt->bindParam(':priUserId', $this->priUserId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    // get privilege 
    public function getPrivilege () {
        $query = 'SELECT * FROM '.$this->table.' 
                WHERE
                    priUserId=?';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //bind ID
        $stmt->bindParam(1, $this->priUserId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //create privilege
    public function createPrivilege () {
        $query = 'INSERT INTO '.$this->table.' 
                VALUES (
                    :priUserId,
                    :priDashboard,
                    :priUser,
                    :priInventory,
                    :priManage,
                    :priPatientManagement,
                    :priPharmacyCorner,
                    :priNotification,
                    :priPos)';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->priUserId = htmlspecialchars(strip_tags($this->priUserId));
        $this->priDashboard = htmlspecialchars(strip_tags($this->priDashboard));
        $this->priUser = htmlspecialchars(strip_tags($this->priUser));
        $this->priInventory = htmlspecialchars(strip_tags($this->priInventory));
        $this->priManage = htmlspecialchars(strip_tags($this->priManage));
        $this->priPatientManagement = htmlspecialchars(strip_tags($this->priPatientManagement));
        $this->priPharmacyCorner = htmlspecialchars(strip_tags($this->priPharmacyCorner));
        $this->priNotification = htmlspecialchars(strip_tags($this->priNotification));
        $this->priPos = htmlspecialchars(strip_tags($this->priPos));

        //bind params
        $stmt->bindParam(':priUserId', $this->priUserId);
        $stmt->bindParam(':priDashboard', $this->priDashboard);
        $stmt->bindParam(':priUser', $this->priUser);
        $stmt->bindParam(':priInventory', $this->priInventory);
        $stmt->bindParam(':priManage', $this->priManage);
        $stmt->bindParam(':priPatientManagement', $this->priPatientManagement);
        $stmt->bindParam(':priPharmacyCorner', $this->priPharmacyCorner);
        $stmt->bindParam(':priNotification', $this->priNotification);
        $stmt->bindParam(':priPos', $this->priPos);

        //execute
        $stmt->execute();

        return $stmt;
    }
}
?>