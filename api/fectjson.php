<?php
require_once('conect.php'); // Ensure correct path to connect.php

try {
    // Fetch JSON data from API
    $json_data = file_get_contents('http://localhost/web-compiceui/api/getdata.php');
    $data = json_decode($json_data, true); // Decode JSON into associative array

    // Loop through categories and products to insert into database
    foreach ($data['categories'] as $category) {
        foreach ($category['products'] as $product) {
            $sql = "INSERT INTO products (id, name, brand, price, stock, rating, sale, reviews, soldout, comment, imageUrl, imgsecond)
                    VALUES (:id, :name, :brand, :price, :stock, :rating, :sale, :reviews, :soldout, :comment, :imageUrl, :imgsecond)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $product['id'], PDO::PARAM_INT);
            $stmt->bindParam(':name', $product['name'], PDO::PARAM_STR);
            $stmt->bindParam(':brand', $product['brand'], PDO::PARAM_STR);
            $stmt->bindParam(':price', $product['price'], PDO::PARAM_INT);
            $stmt->bindParam(':stock', $product['stock'], PDO::PARAM_INT);
            $stmt->bindParam(':rating', $product['rating'], PDO::PARAM_INT);
            $stmt->bindParam(':sale', $product['sale'], PDO::PARAM_INT);
            $stmt->bindParam(':reviews', $product['reviews'], PDO::PARAM_INT);
            $stmt->bindParam(':soldout', $product['soldout'], PDO::PARAM_INT);
            $stmt->bindParam(':comment', $product['comment'], PDO::PARAM_INT); // Assuming comment is an INT, change to PARAM_STR if it's a string
            $stmt->bindParam(':imageUrl', $product['imageUrl'], PDO::PARAM_STR);
            $stmt->bindParam(':imgsecond', $product['imgsecond'], PDO::PARAM_STR);
            $stmt->execute();
        }
    }

    echo "Data inserted successfully"; // Confirmation message after successful insertion

} catch(PDOException $e) {
    echo "Database connection error: " . $e->getMessage();
}

// Close database connection
$conn = null;
?>
