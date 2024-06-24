
//  fect data for object come display
//  fect data for product




var product = [
    { id: 1, title: 'Product 1', price: 20, image: 'https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png', desc: 'Description 2' },
    { id: 2, title: 'Product 2', price: 20, image: 'https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png', desc: 'Description 2' },
    // Add more products as needed
];


/*ฟังชั่น เปิดกล่องสินค้า + เพิ่มสินค้า ลงใน cart*/

function increaseQuantity() {
    var quantityInput = document.getElementById('quantity');
    var currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
}

function decreaseQuantity() {
    var quantityInput = document.getElementById('quantity');
    var currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity - 1;
}




/*ฟังชั่น เปิดกล่องสินค้า*/
var productindex = 0;   


function openProduct(i) {
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
    }

    if (pass) {
        var obj = {
            index: productindex,
            id: productId,
            name: product[productindex].title,
            price: product[productindex].price,
            img: product[productindex].image,
            count: 1 // กำหนดค่า count เป็น 1 เมื่อสินค้าใหม่ถูกเพิ่มเข้าตะกร้า
        };

        cart.push(obj);
    }

    console.log(cart);

    if (pass) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product added to cart successfully",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        // เพิ่มจำนวนสินค้าในตะกร้าและอัปเดตตัวแสดงจำนวนในตะกร้า
        var quantityInput = document.getElementById('quantity');
        var currentQuantity = parseInt(quantityInput.value);
        quantityInput.value = currentQuantity + 1;
    }

    $("#cartcout").css('display', 'flex').text(cart.length);
}