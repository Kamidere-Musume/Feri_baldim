<?php
class Upload {
  public static function handle(): void {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_FILES['file'])) {
      Response::error('No file uploaded', 400);
      return;
    }

    $file = $_FILES['file'];
    $allowed = ['jpg','jpeg','png','gif','webp'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    if (!in_array($ext, $allowed)) {
      Response::error('Invalid file type', 400);
      return;
    }

    $destDir = __DIR__ . '/../public/uploads/';
    $filename = uniqid('img_') . '.' . $ext;
    $path = $destDir . $filename;

    if (!move_uploaded_file($file['tmp_name'], $path)) {
      Response::error('Failed to save file', 500);
      return;
    }

    Response::json([
      'success' => true,
      'path' => '/uploads/' . $filename
    ]);
  }
}
