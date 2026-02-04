<?php
class Experience {
    private $conn;
    private $table_name = "experiences";

    public $id;
    public $title;
    public $company;
    public $description;
    public $start_date;
    public $end_date;
    public $current_job;
    public $type;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY start_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>
