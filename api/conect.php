<?php
// Database connection information
$db_host = "localhost";
$db_name = "shop";
$db_user = "root";
$db_pass = "";

// Create a database connection
try {
    $conn = new PDO("mysql:host=${db_host};dbname=${db_name}", $db_user, $db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connected successfully"; // This message indicates successful connection
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit;
}
?>
