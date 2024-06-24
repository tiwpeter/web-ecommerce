<?php
// ตั้งค่า Content-Type เป็น JSON
header('Content-Type: application/json');

// กำหนด path ของไฟล์ JSON
$jsonFilePath = "data.json"; // แก้ตามตำแหน่งของไฟล์ JSON ที่คุณต้องการใช้

// อ่านข้อมูล JSON จากไฟล์
$jsonData = file_get_contents($jsonFilePath);

// ตรวจสอบว่าอ่านข้อมูลได้หรือไม่
if ($jsonData === false) {
    // หากไม่สามารถอ่านได้ ส่ง HTTP response code 500 (Internal Server Error)
    http_response_code(500);
    echo json_encode(['error' => 'Failed to read JSON file']);
    exit;
}

// แปลง JSON เป็น associative array
$productData = json_decode($jsonData, true);

// ตรวจสอบว่าการแปลง JSON สำเร็จหรือไม่
if ($productData === null) {
    // หากไม่สามารถแปลงได้ ส่ง HTTP response code 500 (Internal Server Error)
    http_response_code(500);
    echo json_encode(['error' => 'Failed to parse JSON data']);
    exit;
}

// ส่งค่าข้อมูล JSON กลับไปยังคำขอ AJAX
echo json_encode($productData);
?>
