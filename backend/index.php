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

// Si le backend est dans un sous-dossier, on l'ignore pour trouver l'endpoint
// On cherche l'index qui suit "backend" ou on prend le dernier segment
$key = array_search('backend', $uri_parts);
$endpoint = ($key !== false && isset($uri_parts[$key + 1])) ? $uri_parts[$key + 1] : end($uri_parts);
$id = ($key !== false && isset($uri_parts[$key + 2])) ? $uri_parts[$key + 2] : null;

// Route les requêtes API
routeRequest($requestMethod, $endpoint, $id);
?>