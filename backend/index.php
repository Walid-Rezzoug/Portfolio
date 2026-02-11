<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config/db.php';
require_once 'routes/api.php';

$requestMethod = $_SERVER["REQUEST_METHOD"];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri_parts = explode('/', trim($uri, '/'));

// Modification de la logique de routing pour gérer correctement les URLs type /resource/id
$key = array_search('backend', $uri_parts);

if ($key !== false) {
    // Si "backend" est trouvé dans l'URL (cas XAMPP classique : localhost/backend/...)
    $endpoint = isset($uri_parts[$key + 1]) ? $uri_parts[$key + 1] : null;
    $id = isset($uri_parts[$key + 2]) ? $uri_parts[$key + 2] : null;
} else {
    // Si "backend" n'est pas trouvé (cas serveur dédié : localhost:8000/...)
    $endpoint = isset($uri_parts[0]) ? $uri_parts[0] : null;
    $id = isset($uri_parts[1]) ? $uri_parts[1] : null;
}

// Route les requêtes API
routeRequest($requestMethod, $endpoint, $id);
?>