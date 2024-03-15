<?php
//ดึงฐานข้อมูล
        require_once('./db.php');

    try{
        if($_SERVER['REQUEST_METHOD'] == 'GET'){
            $object = new stdClass();
            
            //products
            $stmt = $db->prepare('SELECT * FROM `products` ORDER BY id DESC');


        if($stmt->execute()){
            $num = $stmt->rowCount();
            if($num > 0){

                $object->Result = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    //$items = array(
                      //"thisisname" => $name,
                      //"thisisprice" => $price,  
                      //มัน่าจะผิด ไอตรงราคากับชื่อแน่ๆเลยx
                      //แล้วก็jqry x
                      // ผิดตรง sql
  
                    //);//ดันเข้า$object->Result แล้วก็เอาตัวนี้ใส่ item อีกที
                    array_push( $object->Result  , $row  );
                }
                $object->RespCode =200;
                $object->RespMessage = 'success';
                http_response_code(200);
            }
            else{
                $object->RespCode =400;
                $object->Log =0;
                $object->RespMessage = 'bad : not fond data';
                http_response_code(400);
            }

            echo json_encode($object);
        }
        else{
            $object->RespCode =500;
            $object->Log =1;
            $object->RespMessage = 'bad : bad sql';
            http_response_code(400);

        }

    }
    else{
        http_response_code(405);

    }

    }
    catch(PDOException $e) {
        http_response_code(500);
        echo $e->getMessage();
    }

?>