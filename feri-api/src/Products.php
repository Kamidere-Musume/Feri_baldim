<?php
// src/Products.php
class Products {
  private PDO $db;
  public function __construct(PDO $pdo) { $this->db = $pdo; }

  public function list(array $query): void {
    // Filters
    $where = [];
    $params = [];

    if (!empty($query['category_id'])) {
      $where[] = 'p.category_id = :category_id';
      $params[':category_id'] = (int)$query['category_id'];
    }
    if (!empty($query['status'])) {
      $where[] = 'p.status = :status';
      $params[':status'] = $query['status'];
    }
    if (!empty($query['q'])) {
      // Search in name/description/tags
      $where[] = '(p.name LIKE :q OR p.description LIKE :q OR p.tags LIKE :q)';
      $params[':q'] = '%' . $query['q'] . '%';
    }

    $whereSql = $where ? ('WHERE ' . implode(' AND ', $where)) : '';

    // Pagination
    $limit = isset($query['limit']) ? max(1, min(100, (int)$query['limit'])) : 24;
    $offset = isset($query['offset']) ? max(0, (int)$query['offset']) : 0;

    // Sorting (whitelist)
    $allowedOrder = ['created_at','price','name','id'];
    $order = in_array(($query['order'] ?? ''), $allowedOrder, true) ? $query['order'] : 'created_at';
    $dir = strtolower($query['dir'] ?? 'desc') === 'asc' ? 'asc' : 'desc';

    // Count total for pagination UI
    $countSql = "SELECT COUNT(*) AS total FROM products p $whereSql";
    $cstmt = $this->db->prepare($countSql);
    foreach ($params as $k => $v) { $cstmt->bindValue($k, $v); }
    $cstmt->execute();
    $total = (int)$cstmt->fetchColumn();

    // Data query with category join
    $sql = "SELECT p.id, p.category_id, c.name AS category_name, p.name, p.description,
                   p.price, p.image_url, p.tags, p.status, p.created_at
            FROM products p
            JOIN categories c ON c.id = p.category_id
            $whereSql
            ORDER BY $order $dir
            LIMIT :limit OFFSET :offset";
    $stmt = $this->db->prepare($sql);
    foreach ($params as $k => $v) { $stmt->bindValue($k, $v); }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $rows = $stmt->fetchAll();

    Response::json([
      'total' => $total,
      'limit' => $limit,
      'offset' => $offset,
      'results' => $rows
    ]);
  }
}
