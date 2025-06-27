<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'tu_usuario'); // Por defecto suele ser 'root'
define('DB_PASSWORD', 'tu_contraseña'); // Si tienes contraseña
define('DB_NAME', 'hotel_shumak_ware');

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME,
        DB_USER,
        DB_PASSWORD,
        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("ERROR: No se pudo establecer la conexión. " . $e->getMessage());
}
?>
