<?php
require_once 'models/Experience.php';

class ExperienceController {
    private $db;
    private $experience;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->experience = new Experience($this->db);
    }

    public function read() {
        $stmt = $this->experience->read();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $experience_arr = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $experience_item = array(
                    "id" => $id,
                    "title" => $title,
                    "company" => $company,
                    "description" => $description,
                    "start_date" => $start_date,
                    "end_date" => $end_date,
                    "current_job" => (bool)$current_job,
                    "type" => $type
                );
                array_push($experience_arr, $experience_item);
            }
            http_response_code(200);
            echo json_encode($experience_arr);
        } else {
            http_response_code(200);
            echo json_encode([]);
        }
    }
}
?>
