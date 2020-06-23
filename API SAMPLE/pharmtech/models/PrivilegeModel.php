<?php
class PrivilegeModel {
    //DB stuff
    private $conn;
    private $table = 'privilege';

    //Post Properties
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
}
?>