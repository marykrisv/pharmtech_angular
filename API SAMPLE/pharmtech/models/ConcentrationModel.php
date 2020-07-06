<?php
class ConcentrationModel {
    //DB stuff
    private $conn;
    private $table = 'concentration';
    private $viewtable = 'currentconcentrations';

    //Post Properties
    public $conId;
    public $conValue;
    public $conCreatedOn;
    public $conCreatedBy;
    public $conModifiedOn;
    public $conModifiedBy;
    public $conDeleted;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // delete concentration 
    public function deleteConcentration () {
        $query = 'UPDATE '.$this->table.'
                SET
                    conDeleted = 1,
                    conModifiedOn=:conModifiedOn,
                    conModifiedBy=:conModifiedBy
                WHERE
                    conId = :conId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->conId = htmlspecialchars(strip_tags($this->conId));
        $this->conModifiedOn = htmlspecialchars(strip_tags($this->conModifiedOn));
        $this->conModifiedBy = htmlspecialchars(strip_tags($this->conModifiedBy));

        //bind params
        $stmt->bindParam(':conModifiedOn', $this->conModifiedOn);
        $stmt->bindParam(':conModifiedBy', $this->conModifiedBy);
        $stmt->bindParam(':conId', $this->conId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    // get concentration 
    public function viewConcentrationDetail () {
        $query = 'SELECT *
                FROM '.$this->viewtable.'
                WHERE 
                    conId=:conId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->conId = htmlspecialchars(strip_tags($this->conId));

        //bind ID
        $stmt->bindParam(':conId', $this->conId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    // get concentration
    public function viewAllConcentration () {
        $query = 'SELECT COUNT(*) OVER () as total, c.*
                FROM '.$this->viewtable.' c
                ORDER BY conValue ASC';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //update concentration
    public function updateConcentration () {
        $query = 'UPDATE '.$this->table.'
                SET
                    conValue = :conValue,
                    conModifiedBy = :conModifiedBy,
                    conModifiedOn = :conModifiedOn
                WHERE
                    conId = :conId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->conValue = htmlspecialchars(strip_tags($this->conValue));
        $this->conModifiedBy = htmlspecialchars(strip_tags($this->conModifiedBy));
        $this->conModifiedOn = htmlspecialchars(strip_tags($this->conModifiedOn));
        $this->conId = htmlspecialchars(strip_tags($this->conId));

        //bind params
        $stmt->bindParam(':conValue', $this->conValue);
        $stmt->bindParam(':conModifiedBy', $this->conModifiedBy);
        $stmt->bindParam(':conModifiedOn', $this->conModifiedOn);
        $stmt->bindParam(':conId', $this->conId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //create concentration
    public function createConcentration () {
        $query = 'INSERT INTO '.$this->table.' 
                VALUES (
                    null,
                    :conValue,
                    null,
                    :conCreatedBy,
                    null,
                    0,
                    0)';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->conValue = htmlspecialchars(strip_tags($this->conValue));
        $this->conCreatedBy = htmlspecialchars(strip_tags($this->conCreatedBy));

        //bind params
        $stmt->bindParam(':conValue', $this->conValue);
        $stmt->bindParam(':conCreatedBy', $this->conCreatedBy);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //check value
    public function checkValueAdd() {
        //create query
        $query = 'SELECT conValue from '.$this->viewtable.'
                    WHERE
                        conValue=:conValue
                    LIMIT 1';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->conValue = htmlspecialchars(strip_tags($this->conValue));

        //bind data
        $stmt->bindParam(':conValue', $this->conValue);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //check value
    public function checkValueUpdate() {
        //create query
        $query = 'SELECT conValue from '.$this->viewtable.'
                    WHERE
                        conValue=:conValue and conId!=:conId
                    LIMIT 1';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->conValue = htmlspecialchars(strip_tags($this->conValue));
        $this->conId = htmlspecialchars(strip_tags($this->conId));

        //bind data
        $stmt->bindParam(':conValue', $this->conValue);
        $stmt->bindParam(':conId', $this->conId);

        //execute
        $stmt->execute();

        return $stmt;
    }
}
?>