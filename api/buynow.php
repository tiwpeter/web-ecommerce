<?php
require_once('conect.php'); // Include the database connection script

if ($db) {
    try {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $object = new stdClass();
            $amount = 0;
            $product = $_POST['product'];
        
            try {
                // เรียกใช้งาน $db จากไฟล์ conect.php
                require_once('conect.php'); // ตรวจสอบว่าไฟล์ conect.php มีการเชื่อมต่อฐานข้อมูลแล้ว
                
                $stmt = $db->prepare('SELECT id, price FROM products ORDER BY id DESC');
                if ($stmt->execute()) {
                    $queryproduct = array();
                    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        extract($row);
                        $items = array(
                            "id" => $id,
                            "price" => $price
                        );
                        array_push($queryproduct, $items);
                    }
        
                    // คำนวณจำนวนเงินทั้งหมด
                    foreach ($product as $item) {
                        foreach ($queryproduct as $queryitem) {
                            if (intval($item['id']) === intval($queryitem['id'])) {
                                $amount += intval($item['count']) * intval($queryitem['price']);
                                break;
                            }
                        }
                    }
        
                    // คำนวณค่าจัดส่งและภาษี
                    $shipping = $amount + 60;
                    $vat = $shipping * 7 / 100;
                    $netamount = $shipping + $vat;
        
                    // สร้าง transaction ID และเตรียมข้อมูลสำหรับบันทึกลงในฐานข้อมูล
                    $transid = round(microtime(true) * 1000);
                    $orderlist = json_encode($product); // แปลงเป็น JSON ก่อนบันทึก
                    $mil = time() * 1000;
                    $updated_at = date("Y-m-d H:i:s");
        
                    // เตรียมและ execute คำสั่ง SQL สำหรับการบันทึกข้อมูล
                    $stmt = $db->prepare('INSERT INTO sp_transaction (transid, orderlist, amount, shipping, vat, netamount, operation, mil, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
                    if ($stmt->execute([$transid, $orderlist, $amount, $shipping, $vat, $netamount, 'PENDING', $mil, $updated_at])) {
                        $object->RespCode = 200;
                        $object->RespMessage = 'success';
                        $object->Amount = new stdClass();
                        $object->Amount->Amount = $amount;
                        $object->Amount->Shipping = $shipping;
                        $object->Amount->Vat = $vat;
                        $object->Amount->Netamount = $netamount;
        
                        http_response_code(200);
                    } else {
                        $object->RespCode = 300;
                        $object->Log = 0;
                        $object->RespMessage = 'bad : insert transaction fail';
                        http_response_code(300);
                    }
                } else {
                    $object->RespCode = 500;
                    $object->Log = 1;
                    $object->RespMessage = 'bad : cant get product';
                    http_response_code(500);
                }
        
                // ส่งคำตอบกลับเป็น JSON
                echo json_encode($object);
            } catch (PDOException $e) {
                http_response_code(500);
                echo "Database connection error: " . $e->getMessage();
            }
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo "Database error: " . $e->getMessage();
    }
} else {
    echo "Database connection is not established.";
}
?>