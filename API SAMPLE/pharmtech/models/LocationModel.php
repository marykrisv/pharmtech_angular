<?php
class LocationModel {
    //DB stuff
    private $conn;
    private $table = 'location';
    private $viewtable = 'currentlocations';

    //location Properties
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

    // delete location 
    public function deleteLocation () {
        $query = 'UPDATE '.$this->table.'
                SET
                    locDeleted = 1,
                    locModifiedOn=:locModifiedOn,
                    locModifiedBy=:locModifiedBy
                WHERE
                    locId = :locId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->locId = htmlspecialchars(strip_tags($this->locId));
        $this->locModifiedOn = htmlspecialchars(strip_tags($this->locModifiedOn));
        $this->locModifiedBy = htmlspecialchars(strip_tags($this->locModifiedBy));

        //bind params
        $stmt->bindParam(':locModifiedOn', $this->locModifiedOn);
        $stmt->bindParam(':locModifiedBy', $this->locModifiedBy);
        $stmt->bindParam(':locId', $this->locId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    // get location 
    public function viewLocationDetail () {
        $query = 'SELECT *
                FROM '.$this->viewtable.'
                WHERE 
                    locId=:locId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->locId = htmlspecialchars(strip_tags($this->locId));

        //bind ID
        $stmt->bindParam(':locId', $this->locId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    // get location 
    public function viewAllLocation () {
        $query = 'SELECT COUNT(*) OVER () as total, c.*
                FROM '.$this->viewtable.' c
                ORDER BY locName ASC';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //update location
    public function updateLocation () {
        $query = 'UPDATE '.$this->table.'
                SET
                    locName = :locName,
                    locDescription = :locDescription,
                    locLatitude = :locLatitude,
                    locLongitude = :locLongitude,
                    locModifiedBy = :locModifiedBy,
                    locModifiedOn = :locModifiedOn
                WHERE
                    locId = :locId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->locName = htmlspecialchars(strip_tags($this->locName));
        $this->locDescription = htmlspecialchars(strip_tags($this->locDescription));
        $this->locLatitude = htmlspecialchars(strip_tags($this->locLatitude));
        $this->locLongitude = htmlspecialchars(strip_tags($this->locLongitude));
        $this->locModifiedBy = htmlspecialchars(strip_tags($this->locModifiedBy));
        $this->locModifiedOn = htmlspecialchars(strip_tags($this->locModifiedOn));
        $this->locId = htmlspecialchars(strip_tags($this->locId));

        //bind params
        $stmt->bindParam(':locName', $this->locName);
        $stmt->bindParam(':locDescription', $this->locDescription);
        $stmt->bindParam(':locLatitude', $this->locLatitude);
        $stmt->bindParam(':locLongitude', $this->locLongitude);
        $stmt->bindParam(':locModifiedBy', $this->locModifiedBy);
        $stmt->bindParam(':locModifiedOn', $this->locModifiedOn);
        $stmt->bindParam(':locId', $this->locId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //create location
    public function createLocation () {
        $query = 'INSERT INTO '.$this->table.' 
                VALUES (
                    null,
                    :locName,
                    :locDescription,
                    :locLatitude,
                    :locLongitude,
                    null,
                    :locCreatedBy,
                    null,
                    0,
                    0)';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->locName = htmlspecialchars(strip_tags($this->locName));
        $this->locDescription = htmlspecialchars(strip_tags($this->locDescription));
        $this->locLatitude = htmlspecialchars(strip_tags($this->locLatitude));
        $this->locLongitude = htmlspecialchars(strip_tags($this->locLongitude));
        $this->locCreatedBy = htmlspecialchars(strip_tags($this->locCreatedBy));

        //bind params
        $stmt->bindParam(':locName', $this->locName);
        $stmt->bindParam(':locDescription', $this->locDescription);
        $stmt->bindParam(':locLatitude', $this->locLatitude);
        $stmt->bindParam(':locLongitude', $this->locLongitude);
        $stmt->bindParam(':locCreatedBy', $this->locCreatedBy);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //check name
    public function checkNameAdd() {
        //create query
        $query = 'SELECT locName from '.$this->viewtable.'
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

    //check name
    public function checkNameUpdate() {
        //create query
        $query = 'SELECT locName from '.$this->viewtable.'
                    WHERE
                        locName=:locName and locId!=:locId
                    LIMIT 1';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->locName = htmlspecialchars(strip_tags($this->locName));
        $this->locId = htmlspecialchars(strip_tags($this->locId));

        //bind data
        $stmt->bindParam(':locName', $this->locName);
        $stmt->bindParam(':locId', $this->locId);

        //execute
        $stmt->execute();

        return $stmt;
    }
}
?>