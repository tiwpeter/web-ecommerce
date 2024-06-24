<<<<<<< HEAD
// = send price + 
//
function buynow() {

    /*// Check if productsToSend is not empty
    if (productsToSend.length === 0) {
        console.log("No products to send. Aborting...");
        return; // Exit function if no products to send
    }

    // totel
    */
=======

//debug สาเหตุที่ไม่ขึ้นเพราะ ตระกร้ายังไม่ใส่มั้ง
/* ฟังชั่น buyนาว 47.28 */
//onclick buynow() // เอาใส่ตรงBuy เพิ่มฟังชั่นตระกล้า
//Uncaught SyntaxError: Unexpected identifier 'buynow' แก้
function buynow() {
>>>>>>> 5c9f5029f912dbe0d4973cbc7aeda40cfd450ea5
    // เพิ่ม property id และ price ในออบเจกต์ใน cart
    var updatedCart = cart.map(item => ({
        id: item.id,
        price: item.price,
        // เพิ่ม properties อื่นๆ ที่อาจจำเป็นตามความต้องการ
        count: item.count,
        img: item.img,
        name: item.name,
        index: item.index
    }));

    // สร้างออบเจกต์ใหม่ที่มีโครงสร้างเฉพาะ id และ price เท่านั้น
    var productsToSend = updatedCart.map(item => ({
        id: item.id,
        price: item.price,
        count: item.count, // เพิ่ม property count เข้าไปในออบเจกต์
    }));
    console.log(productsToSend); // แสดงข้อมูลที่จะส่งไปยัง API ในคอนโซล
    console.log("สินค้าที่จะส่ง:", updatedCart); // เพิ่มบรรทัดนี้เพื่อแสดงข้อมูลที่จะส่งไปยังฟังก์ชัน buynow()

<<<<<<< HEAD
    // Send data to Stripe API
    $.ajax({
        method: 'post',
        //url: 'http://localhost/stirpe-shipping%20-%20Copy/api/buynow.php', // ตั้งชื่อไฟล์ที่มีโค้ดของ Stripe ที่จะทำการสร้าง session
        url: 'http://localhost/stirpe-shipping-topayment/api/buynow.php' ,
=======

    // ส่งข้อมูลไปยัง API
    $.ajax({
        method: 'post',
        url: '/Project1test/api/buynow.php',
>>>>>>> 5c9f5029f912dbe0d4973cbc7aeda40cfd450ea5
        data: {
            products: productsToSend
        },
        success: function(response) {
<<<<<<< HEAD
            console.log("ส่งข้อมูลสำเร็จ"); // เพิ่มบรรทัดนี้เพื่อแสดงข้อความเมื่อส่งข้อมูลสำเร็จ
            console.log(response); // แสดงข้อมูลการตอบกลับจากไฟล์ process_payment.php
            // ส่งผ่านไปยังหน้าจ่ายเงินของ Stripe หรือดำเนินการต่อตามต้องการ
                        // ส่งผ่าน URL ที่ได้จาก API เพื่อไปยังหน้าชำระเงิน
            window.location.href = response.checkout_url;
        },
        error: function(err) {
            console.log(err); // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาดในการส่งข้อมูล
            console.log("ส่งข้อมูลสำเร็จ"); // เพิ่มบรรทัดนี้เพื่อแสดงข้อความเมื่อส่งข้อมูลสำเร็จ

        }
    });
}
//////////////////////////////////////////////////////////
//all price
function deinitems(action, index) {
    if (action == '-') {
        if (cart[index].count > 0) {
            cart[index].count--;
            $("#counttitems" + index).text(cart[index].count);
            if (cart[index].count <= 0) {
=======
            console.log(response);
        },
        error: function(err) {
            console.log(err);
        }
    });
}
//48.53 ตระกล้า โชว์ เทส
//47.50 อธิบาย

function deinitems(action, index) {
    if (action == '-') {
        if (cart[index].cout > 0) {
            cart[index].cout--;
            $("#counttitems" + index).text(cart[index].cout)

            if (cart[index].cout <= 0) {
>>>>>>> 5c9f5029f912dbe0d4973cbc7aeda40cfd450ea5
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: '',
<<<<<<< HEAD
                });
            }
        }
    } else if (action == '+') {
        cart[index].count++;
        $("#counttitems" + index).text(cart[index].count);
        var itemTotalPrice = cart[index].price * cart[index].count;
        $("#totalPrice").text( "Total " + itemTotalPrice); // แสดงราคารวมของรายการที่เพิ่มจำนวนสินค้า
    }
    updateTotalPrice();
=======
                })
            }
        }
    } else if (action == '+') {
        cart[index].cout++;
        $("#counttitems" + index).text(cart[index].cout)
    }
>>>>>>> 5c9f5029f912dbe0d4973cbc7aeda40cfd450ea5
}