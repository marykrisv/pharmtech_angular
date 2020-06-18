<?php
class Database {
    //DB Params
    private $host = 'localhost';
    private $db_name = 'pharmtech';
    private $username = 'root';
    private $password = '';
    private $conn;
    
    public function connect() {
        $this->conn = null;

        try {
            $this->conn = new PDO('mysql:host=' . $this->host . '; dbname='.$this->db_name, 
            $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo 'Connection Error: ' .$e->getMessage();
        }
        // $conn = mysqli_connect($this->host,$this->username,$this->password,$this->db_name) or 
        // die ("ERROR" .mysqli_error($this->connection));

        return $this->conn;
    }
}


?>