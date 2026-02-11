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

    public function create() {
        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->title) && !empty($data->company) && !empty($data->type)) {
            $this->experience->title = $data->title;
            $this->experience->company = $data->company;
            $this->experience->description = $data->description;
            $this->experience->start_date = $data->start_date;
            $this->experience->end_date = $data->end_date;
            $this->experience->current_job = $data->current_job ? 1 : 0;
            $this->experience->type = $data->type;

            if($this->experience->create()) {
                http_response_code(201);
                echo json_encode(["message" => "Experience created."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Unable to create experience."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Incomplete data."]);
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents("php://input"));
        
        $this->experience->id = $id;
        $this->experience->title = $data->title;
        $this->experience->company = $data->company;
        $this->experience->description = $data->description;
        $this->experience->start_date = $data->start_date;
        $this->experience->end_date = $data->end_date;
        $this->experience->current_job = $data->current_job ? 1 : 0;
        $this->experience->type = $data->type;

        if($this->experience->update()) {
            http_response_code(200);
            echo json_encode(["message" => "Experience updated."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to update experience."]);
        }
    }

    public function delete($id) {
        $this->experience->id = $id;

        if($this->experience->delete()) {
            http_response_code(200);
            echo json_encode(["message" => "Experience deleted."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to delete experience."]);
        }
    }
}
?>
