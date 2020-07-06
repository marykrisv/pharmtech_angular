<?php
class DiscountModel {
    //DB stuff
    private $conn;
    private $table = 'discount';
    private $viewtable = 'currentdiscounts';

    //disount Properties
    public $disId;
    public $disName;
    public $disPercent;
    public $disCreatedOn;
    public $disCreatedBy;
    public $disModifiedOn;
    public $disModifiedBy;
    public $disDeleted;

    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }

    // delete discount 
    public function deleteDiscount () {
        $query = 'UPDATE '.$this->table.'
                SET
                    disDeleted = 1,
                    disModifiedOn=:disModifiedOn,
                    disModifiedBy=:disModifiedBy
                WHERE
                    disId = :disId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->disId = htmlspecialchars(strip_tags($this->disId));
        $this->disModifiedOn = htmlspecialchars(strip_tags($this->disModifiedOn));
        $this->disModifiedBy = htmlspecialchars(strip_tags($this->disModifiedBy));

        //bind params
        $stmt->bindParam(':disModifiedOn', $this->disModifiedOn);
        $stmt->bindParam(':disModifiedBy', $this->disModifiedBy);
        $stmt->bindParam(':disId', $this->disId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    // get discount 
    public function viewDiscountDetail () {
        $query = 'SELECT *
                FROM '.$this->viewtable.'
                WHERE 
                    disId=:disId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->disId = htmlspecialchars(strip_tags($this->disId));

        //bind ID
        $stmt->bindParam(':disId', $this->disId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    // get discount
    public function viewAllDiscount () {
        $query = 'SELECT COUNT(*) OVER () as total, c.*
                FROM '.$this->viewtable.' c
                ORDER BY disName ASC';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //update discount
    public function updateDiscount () {
        $query = 'UPDATE '.$this->table.'
                SET
                    disName = :disName,
                    disPercent =:disPercent,
                    disModifiedBy = :disModifiedBy,
                    disModifiedOn = :disModifiedOn
                WHERE
                    disId = :disId';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->disName = htmlspecialchars(strip_tags($this->disName));
        $this->disPercent = htmlspecialchars(strip_tags($this->disPercent));
        $this->disModifiedBy = htmlspecialchars(strip_tags($this->disModifiedBy));
        $this->disModifiedOn = htmlspecialchars(strip_tags($this->disModifiedOn));
        $this->disId = htmlspecialchars(strip_tags($this->disId));

        //bind params
        $stmt->bindParam(':disName', $this->disName);
        $stmt->bindParam(':disPercent', $this->disPercent);
        $stmt->bindParam(':disModifiedBy', $this->disModifiedBy);
        $stmt->bindParam(':disModifiedOn', $this->disModifiedOn);
        $stmt->bindParam(':disId', $this->disId);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //create discount
    public function createDiscount () {
        $query = 'INSERT INTO '.$this->table.' 
                VALUES (
                    null,
                    :disName,
                    :disPercent,
                    null,
                    :disCreatedBy,
                    null,
                    0,
                    0)';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->disName = htmlspecialchars(strip_tags($this->disName));
        $this->disPercent = htmlspecialchars(strip_tags($this->disPercent));
        $this->disCreatedBy = htmlspecialchars(strip_tags($this->disCreatedBy));

        //bind params
        $stmt->bindParam(':disName', $this->disName);
        $stmt->bindParam(':disPercent', $this->disPercent);
        $stmt->bindParam(':disCreatedBy', $this->disCreatedBy);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //check value
    public function checkNameAdd() {
        //create query
        $query = 'SELECT disName from '.$this->viewtable.'
                    WHERE
                        disName=:disName
                    LIMIT 1';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->disName = htmlspecialchars(strip_tags($this->disName));

        //bind data
        $stmt->bindParam(':disName', $this->disName);

        //execute
        $stmt->execute();

        return $stmt;
    }

    //check value
    public function checkNameUpdate() {
        //create query
        $query = 'SELECT disName from '.$this->viewtable.'
                    WHERE
                        disName=:disName and disId!=:disId
                    LIMIT 1';

        //prepare statement
        $stmt = $this->conn->prepare($query);

        //clean data
        $this->disName = htmlspecialchars(strip_tags($this->disName));
        $this->disId = htmlspecialchars(strip_tags($this->disId));

        //bind data
        $stmt->bindParam(':disName', $this->disName);
        $stmt->bindParam(':disId', $this->disId);

        //execute
        $stmt->execute();

        return $stmt;
    }
}
?>