
/*ฟังชั่น เปิดกล่องสินค้า + เพิ่มสินค้า ลงใน cart*/





/*ฟังชั่น เปิดกล่องสินค้า*/
var productindex = 0;   


function openproduct(i) {
    console.log(i); // ตรวจสอบว่าค่า i ถูกส่งเข้ามาถูกต้องหรือไม่
    productindex = i;

    // กำหนดค่ารายละเอียดสินค้าใน modal
    $("#mdd-img").attr('src', product[i].image);
    $('#mdd-name').text(product[i].title).css('font-size', '2.5vw');
    $('#mdd-price').text('$' + product[i].price).css('font-size', '1.5vw');
    $('#mdd-desc').text(product[i].desc);

    // แสดง modal
    $('#modal-ID').show();
}

function closeModal() {
    // ปิด modal
    $(".modal").hide();
}
/* แก้บั๊กตรง คลาส ไอจุดนี่น่าจะคลาส นำเข้าคลาสบนสุด */


/* ฟังชั่นเพิ่มสินค้า */
/* loop ถ้าใช่ก็เพิ่มเข้าคลัง +1มั้ง */
/* pass คือ ture แสดงว่ามันเข้าถึงแน่นอน */
 var cart=[];
 function addcart() {
    var pass = true;
    var productId = product[productindex].id;

    for (let i = 0; i < cart.length; i++) {
        if (productId == cart[i].id) {
            console.log('found same product');
            cart[i].count++;
            pass = false;
            break;
        }
    }/* 52.16 */

    if (pass) {
        var obj = {
            index: productindex,
            id: productId,
            name: product[productindex].title,
            price: product[productindex].price,
            img: product[productindex].image,
            count: 1 // กำหนดค่า count เป็น 1 เมื่อสินค้าใหม่ถูกเพิ่มเข้าตะกร้า
        };

    cart.push(obj) 
    //นำ obj ข้อมูลที่ได้ใส่ใน cart
   }
   console.log(cart) 

   if (pass) {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product added to cart successfully",
        showConfirmButton: false,
        timer: 1500
    });
}

$("#cartcout").css('display', 'flex').text(cart.length);
}
