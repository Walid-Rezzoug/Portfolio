<?php
class Project {
    private $conn;
    private $table_name = "projects";

    public $id;
    public $title;
    public $description;
    public $technologies;
    public $github_url;
    public $live_url;
    public $image_url;
    public $featured;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readOne($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                SET title=:title, description=:description, technologies=:technologies, 
                    github_url=:github_url, live_url=:live_url, image_url=:image_url, featured=:featured";

        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->technologies = htmlspecialchars(strip_tags($this->technologies));
        $this->github_url = htmlspecialchars(strip_tags($this->github_url));
        $this->live_url = htmlspecialchars(strip_tags($this->live_url));
        $this->image_url = htmlspecialchars(strip_tags($this->image_url));

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":technologies", $this->technologies);
        $stmt->bindParam(":github_url", $this->github_url);
        $stmt->bindParam(":live_url", $this->live_url);
        $stmt->bindParam(":image_url", $this->image_url);
        $stmt->bindParam(":featured", $this->featured);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                SET title=:title, description=:description, technologies=:technologies, 
                    github_url=:github_url, live_url=:live_url, image_url=:image_url, featured=:featured
                WHERE id=:id";

        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":technologies", $this->technologies);
        $stmt->bindParam(":github_url", $this->github_url);
        $stmt->bindParam(":live_url", $this->live_url);
        $stmt->bindParam(":image_url", $this->image_url);
        $stmt->bindParam(":featured", $this->featured);
        $stmt->bindParam(":id", $this->id);

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
