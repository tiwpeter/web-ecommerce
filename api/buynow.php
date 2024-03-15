<?php
require_once('./db.php');

try {
    $object = new stdClass(); // สร้างตัวแปร $object เพื่อใช้เก็บข้อมูลผลลัพธ์

    // ตรวจสอบข้อมูลสินค้าที่ส่งมา
    if(isset($_POST['products']) && is_array($_POST['products']) && !empty($_POST['products'])) {
        // ดำเนินการต่อเมื่อมีข้อมูลสินค้า
        $products = $_POST['products'];

        // คำนวณราคารวมของสินค้า
        $amount = 0; // กำหนดค่าเริ่มต้นสำหรับราคารวมเป็น 0
        foreach ($products as $product) {
            // ดึงราคาจากฐานข้อมูลโดยใช้ id
            $stmt = $db->prepare('SELECT price FROM products WHERE id = ?');
            $stmt->execute([$product['id']]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // ถ้าพบราคาในฐานข้อมูล
            if ($row) {
                $amount += intval($product['count']) * intval($row['price']);
            } else {
                // หากไม่พบราคาสำหรับสินค้าที่กำลังคำนวณ จะต้องจัดการตามกรณี
                // เช่น ส่งค่าข้อผิดพลาดกลับไปหรือไม่นับราคาของสินค้านี้เลย ขึ้นอยู่กับความต้องการของระบบของคุณ
            }
        }

        // คำนวณค่าจัดส่งและราคารวมทั้งหมด
        $shipping = $amount + 60;
        $vat = $shipping * 7 / 100;
        $netAmount = $shipping + $vat;
        $transId = microtime(true) + 1000;
        $uplated_at = date("Y-m-d H:i:s"); // แก้เป็น uplated_at

        // เพิ่มรายการซื้อเข้าฐานข้อมูล
        $stmt = $db->prepare('INSERT INTO sp_transaction (id, transid, orderlist, amount, shipping, vat, netamount, operation, mil, uplated_at) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        if ($stmt->execute([$transId, json_encode($products), $amount, $shipping, $vat, $netAmount, 'PENDING', time() * 1000, $uplated_at])) {
            $object->RespCode = 200;
            $object->RespMessage = 'Success';
            http_response_code(200);
        } else {
            $object->RespCode = 300;
            $object->log = 0;
            $object->RespMessage = 'Bad request: Insert transaction failed';
            http_response_code(300);
        }
    } else {
        $object->RespCode = 400;
        $object->log = 1;
        $object->RespMessage = 'Bad request: Products data not found';
        http_response_code(400);
    }

    echo json_encode($object);
} catch (PDOException $e) {
    http_response_code(500); // ส่งรหัสข้อผิดพลาด 500 หากเกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล
    echo $e->getMessage();
}
?>
