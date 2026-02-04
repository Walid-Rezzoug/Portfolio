<?php
class Skill {
    private $conn;
    private $table_name = "skills";

    public $id;
    public $name;
    public $category;
    public $level;
    public $icon;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                SET name=:name, category=:category, level=:level, icon=:icon";

        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->level = htmlspecialchars(strip_tags($this->level));
        $this->icon = htmlspecialchars(strip_tags($this->icon));

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":level", $this->level);
        $stmt->bindParam(":icon", $this->icon);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                SET name=:name, category=:category, level=:level, icon=:icon
                WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->level = htmlspecialchars(strip_tags($this->level));
        $this->icon = htmlspecialchars(strip_tags($this->icon));

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":level", $this->level);
        $stmt->bindParam(":icon", $this->icon);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>
