<?php
require_once 'models/Project.php';

class ProjectController {
    private $db;
    private $project;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->project = new Project($this->db);
    }

    public function read() {
        $stmt = $this->project->read();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $projects_arr = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $project_item = array(
                    "id" => $id,
                    "title" => $title,
                    "description" => $description,
                    "technologies" => $technologies,
                    "github_url" => $github_url,
                    "live_url" => $live_url,
                    "image_url" => $image_url,
                    "featured" => (bool)$featured,
                    "created_at" => $created_at
                );
                array_push($projects_arr, $project_item);
            }
            http_response_code(200);
            echo json_encode($projects_arr);
        } else {
            http_response_code(200); // Retourne un tableau vide au lieu d'un 404 pour éviter le crash react
            echo json_encode([]);
        }
    }

    public function readOne($id) {
        $result = $this->project->readOne($id);
        if ($result) {
            http_response_code(200);
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Projet non trouvé."]);
        }
    }

    public function create() {
        $data = json_decode(file_get_contents("php://input"));
        if (!empty($data->title) && !empty($data->description)) {
            $this->project->title = $data->title;
            $this->project->description = $data->description;
            $this->project->technologies = $data->technologies ?? '';
            $this->project->github_url = $data->github_url ?? '';
            $this->project->live_url = $data->live_url ?? '';
            $this->project->image_url = $data->image_url ?? '';
            $this->project->featured = $data->featured ?? false;

            if ($this->project->create()) {
                http_response_code(201);
                echo json_encode(["message" => "Projet créé avec succès."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Impossible de créer le projet."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents("php://input"));
        $this->project->id = $id;
        
        if (!empty($data->title) && !empty($data->description)) {
            $this->project->title = $data->title;
            $this->project->description = $data->description;
            $this->project->technologies = $data->technologies ?? '';
            $this->project->github_url = $data->github_url ?? '';
            $this->project->live_url = $data->live_url ?? '';
            $this->project->image_url = $data->image_url ?? '';
            $this->project->featured = $data->featured ?? false;

            if ($this->project->update()) {
                http_response_code(200);
                echo json_encode(["message" => "Projet mis à jour."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Impossible de mettre à jour le projet."]);
            }
        }
    }

    public function delete($id) {
        $this->project->id = $id;
        if ($this->project->delete()) {
            http_response_code(200);
            echo json_encode(["message" => "Projet supprimé."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Impossible de supprimer le projet."]);
        }
    }
}
?>
