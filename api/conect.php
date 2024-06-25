<?php
// connect.php - ไฟล์ที่ใช้สำหรับเชื่อมต่อฐานข้อมูล

$db_host = "localhost";
$db_name = "shop";
$db_user = "root";
$db_pass = "";

try {
    $db = new PDO("mysql:host=${db_host};dbname=${db_name}", $db_user, $db_pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connection successful";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit;
}
?>
