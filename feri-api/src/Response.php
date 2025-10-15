<?php
// src/Response.php
class Response {
  public static function json($data, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
  }

  public static function error(string $message, int $code = 400): void {
    self::json(['error' => $message], $code);
  }

  public static function cors(string $origin): void {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
  }
}
