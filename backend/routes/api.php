<?php
function routeRequest($method, $endpoint, $id = null) {

    switch($endpoint) {
        case 'projects':
            require_once 'controllers/ProjectController.php';
            $controller = new ProjectController();
            handleProjectRequest($controller, $method, $id);
            break;
            
        case 'skills':
            require_once 'controllers/SkillController.php';
            $controller = new SkillController();
            handleSkillRequest($controller, $method, $id);
            break;
            
        case 'contact':
            require_once 'controllers/ContactController.php';
            $controller = new ContactController();
            if ($method == 'POST') {
                $controller->create();
            } else if ($method == 'GET') {
                $controller->read();
            }
            break;
            
        case 'experiences':
            require_once 'controllers/ExperienceController.php';
            $controller = new ExperienceController();
            $controller->read();
            break;
            
        default:
            http_response_code(404);
            echo json_encode(["message" => "Endpoint not found"]);
    }
}

function handleProjectRequest($controller, $method, $id) {
    switch($method) {
        case 'GET':
            if ($id) {
                $controller->readOne($id);
            } else {
                $controller->read();
            }
            break;
        case 'POST':
            $controller->create();
            break;
        case 'PUT':
            $controller->update($id);
            break;
        case 'DELETE':
            $controller->delete($id);
            break;
        default:
            http_response_code(405);
    }
}

function handleSkillRequest($controller, $method, $id) {
    switch($method) {
        case 'GET':
            $controller->read();
            break;
        case 'POST':
            $controller->create();
            break;
        case 'PUT':
            $controller->update($id);
            break;
        case 'DELETE':
            $controller->delete($id);
            break;
        default:
            http_response_code(405);
    }
}
?>