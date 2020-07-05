<?php
class LocationModel {
    //DB stuff
    private $conn;
    private $table = 'location';
    private $viewtable = 'currentlocations';

    //Post Properties
    public $locId;
    public $locName;
    public $locDescription;
    public $locLatitude;
    public $locLongitude;
    public $locCreatedOn;
    public $locCreatedBy;
    public $locModifiedOn;
    public $locModifiedBy;
    public $locDeleted;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // get privilege 
    public function viewAllLocation () {
        $query = 'SELECT COUNT(*) OVER () as total, c.*
                FROM '.$this->viewtable.' c';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //bind ID
        $stmt->bindParam(1, $this->priUserId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //create privilege
    public function createLocation () {
        $query = 'INSERT INTO '.$this->table.' 
                VALUES (
                    null,
                    :locName,
                    :locDescription,
                    :locLatitude,
                    :locLongitude,
                    :locCreatedOn,
                    :locCreatedBy,
                    :locModifiedOn,
                    :locModifiedBy,
                    0)';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->locName = htmlspecialchars(strip_tags($this->locName));
        $this->locDescription = htmlspecialchars(strip_tags($this->locDescription));
        $this->locLatitude = htmlspecialchars(strip_tags($this->locLatitude));
        $this->locLongitude = htmlspecialchars(strip_tags($this->locLongitude));
        $this->locCreatedOn = htmlspecialchars(strip_tags($this->locCreatedOn));
        $this->locCreatedBy = htmlspecialchars(strip_tags($this->locCreatedBy));
        $this->locModifiedOn = htmlspecialchars(strip_tags($this->locModifiedOn));
        $this->locModifiedBy = htmlspecialchars(strip_tags($this->locModifiedBy));

        //bind params
        $stmt->bindParam(':locName', $this->locName);
        $stmt->bindParam(':locDescription', $this->locDescription);
        $stmt->bindParam(':locLatitude', $this->locLatitude);
        $stmt->bindParam(':locLongitude', $this->locLongitude);
        $stmt->bindParam(':locCreatedOn', $this->locCreatedOn);
        $stmt->bindParam(':locCreatedBy', $this->locCreatedBy);
        $stmt->bindParam(':locModifiedOn', $this->locModifiedOn);
        $stmt->bindParam(':locModifiedBy', $this->locModifiedBy);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //check name
    public function checkName() {
        //create query
        $query = 'SELECT locName from '.$this->table.'
                    WHERE
                        locName=:locName
                    LIMIT 1';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->locName = htmlspecialchars(strip_tags($this->locName));

        //bind data
        $stmt->bindParam(':locName', $this->locName);

        //execute
        $stmt->execute();

        return $stmt;
    }
}
?>