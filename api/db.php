
<?php
//เชื่อมฐานข้อมูล
    $db_host = 'localhost';
    $db_name = 'shop';
    $db_user = 'root';
    $db_pass = '';

    header('Content-Type: application/json');
    //เวลาเอเชีย
    date_default_timezone_set("Asia/Bangkok");
    // ถ้าไม่แปลง json มันจะส่งเป็นสตริง
//ใส่ {} () ผิด
    try {
        $db = new PDO("mysql:host=${db_host}; dbname=${db_name}",$db_user,$db_pass);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //echo"databese is connected";
    }
    catch(PDOException $e) {
        echo $e->getMessage();
    }
?>