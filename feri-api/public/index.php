<?php
// public/index.php

require __DIR__.'/../src/Response.php';
require __DIR__.'/../src/Database.php';
require __DIR__.'/../src/Categories.php';
require __DIR__.'/../src/Products.php';
require __DIR__.'/../src/Upload.php';


$config = require __DIR__.'/../config.php';

// public/index.php

// Serve existing static files (images, css, js) directly
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';
$staticFile = __DIR__ . $path;
if ($path !== '/' && is_file($staticFile)) {
  // tell PHP built-in server to serve the file
  return false;
}

// CORS
Response::cors($config['cors']['allowed_origin'] ?? '*');

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

// Boot DB
$db = new Database($config['db']);
$pdo = $db->pdo();

// Simple router
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';
$method = $_SERVER['REQUEST_METHOD'];

try {
  if ($method === 'GET' && $path === '/api/categories') {
    (new Categories($pdo))->list();
    exit;
  }

  if ($method === 'GET' && $path === '/api/products') {
    (new Products($pdo))->list($_GET);
    exit;
  }

  // 404 for unmatched routes
  Response::error('Not Found', 404);
} catch (Throwable $e) {
  Response::error('Server Error: '.$e->getMessage(), 500);
}
