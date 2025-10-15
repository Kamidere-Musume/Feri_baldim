<?php
// src/Database.php
class Database {
  private \PDO $pdo;

  public function __construct(array $cfg) {
    $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=%s',
      $cfg['host'], $cfg['port'], $cfg['name'], $cfg['charset']
    );
    $options = [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES => false
    ];
    $this->pdo = new PDO($dsn, $cfg['user'], $cfg['pass'], $options);
  }

  public function pdo(): \PDO {
    return $this->pdo;
  }
}
