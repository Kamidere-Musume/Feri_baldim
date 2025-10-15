<?php
// src/Categories.php
class Categories {
  private PDO $db;
  public function __construct(PDO $pdo) { $this->db = $pdo; }

  public function list(): void {
    $sql = "SELECT c.*, 
        (SELECT p.image_url FROM products p WHERE p.category_id = c.id ORDER BY p.created_at DESC LIMIT 1) AS product_image
        FROM categories c
        ORDER BY c.name ASC";

    $stmt = $this->db->query($sql);
    $rows = $stmt->fetchAll();

    // Optional: combine gradient fields for the frontend (Tailwind)
    foreach ($rows as &$r) {
      $r['gradient'] = trim(($r['gradient_from'] ?? '') . ' ' . ($r['gradient_to'] ?? ''));
    }

    Response::json($rows);
  }
}
