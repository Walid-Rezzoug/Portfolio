<?php
require_once 'models/Skill.php';

class SkillController {
    private $db;
    private $skill;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->skill = new Skill($this->db);
    }

    public function read() {
        $stmt = $this->skill->read();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $skills_arr = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $skill_item = array(
                    "id" => $id,
                    "name" => $name,
                    "category" => $category,
                    "level" => (int)$level,
                    "icon" => $icon
                );
                array_push($skills_arr, $skill_item);
            }
            http_response_code(200);
            echo json_encode($skills_arr);
        } else {
            http_response_code(200);
            echo json_encode([]);
        }
    }
    public function create() {
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->name) && !empty($data->category)) {
            $this->skill->name = $data->name;
            $this->skill->category = $data->category;
            $this->skill->level = $data->level ?? 0;
            $this->skill->icon = $data->icon ?? '';

            if ($this->skill->create()) {
                http_response_code(201);
                echo json_encode(["message" => "Compétence créée."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Erreur lors de la création."]);
            }
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents("php://input"));
        $this->skill->id = $id;
        if (!empty($data->name) && !empty($data->category)) {
            $this->skill->name = $data->name;
            $this->skill->category = $data->category;
            $this->skill->level = $data->level;
            $this->skill->icon = $data->icon;

            if ($this->skill->update()) {
                http_response_code(200);
                echo json_encode(["message" => "Compétence mise à jour."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Erreur lors de la mise à jour."]);
            }
        }
    }

    public function delete($id) {
        $this->skill->id = $id;
        if ($this->skill->delete()) {
            http_response_code(200);
            echo json_encode(["message" => "Compétence supprimée."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Erreur lors de la suppression."]);
        }
    }
}
?>
