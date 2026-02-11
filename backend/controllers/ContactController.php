<?php
require_once 'models/Contact.php';

class ContactController {
    private $db;
    private $contact;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->contact = new Contact($this->db);
    }

    public function create() {
        $data = json_decode(file_get_contents("php://input"));

        if (!empty($data->name) && !empty($data->email)) {
            $this->contact->name = $data->name;
            $this->contact->email = $data->email;
            $this->contact->subject = $data->subject ?? '';
            $this->contact->message = $data->message;

            if ($this->contact->create()) {
                http_response_code(201);
                echo json_encode(["message" => "Message envoyé avec succès."]);
            } else {
                http_response_code(503);
                echo json_encode(["message" => "Impossible d'envoyer le message."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Données incomplètes."]);
        }
    }

    public function read() {
        $stmt = $this->contact->read();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $messages_arr = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $message_item = array(
                    "id" => $id,
                    "name" => $name,
                    "email" => $email,
                    "subject" => $subject,
                    "message" => $message,
                    "created_at" => $created_at,
                    "read_status" => (bool)$read_status
                );
                array_push($messages_arr, $message_item);
            }
            http_response_code(200);
            echo json_encode($messages_arr);
        } else {
            http_response_code(200);
            echo json_encode([]);
        }
    }

    public function update($id) {
        $data = json_decode(file_get_contents("php://input"));
        $this->contact->id = $id;
        $this->contact->read_status = $data->read_status ? 1 : 0;

        if ($this->contact->update()) {
            http_response_code(200);
            echo json_encode(["message" => "Message mis à jour."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Impossible de mettre à jour le message."]);
        }
    }

    public function delete($id) {
        $this->contact->id = $id;
        if ($this->contact->delete()) {
            http_response_code(200);
            echo json_encode(["message" => "Message supprimé."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Impossible de supprimer le message."]);
        }
    }
}
?>
