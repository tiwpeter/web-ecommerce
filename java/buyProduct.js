
//debug สาเหตุที่ไม่ขึ้นเพราะ ตระกร้ายังไม่ใส่มั้ง
/* ฟังชั่น buyนาว 47.28 */
//onclick buynow() // เอาใส่ตรงBuy เพิ่มฟังชั่นตระกล้า
//Uncaught SyntaxError: Unexpected identifier 'buynow' แก้
function buynow() {
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


    // ส่งข้อมูลไปยัง API
    $.ajax({
        method: 'post',
        url: '/Project1test/api/buynow.php',
        data: {
            products: productsToSend
        },
        success: function(response) {
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
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: '',
                })
            }
        }
    } else if (action == '+') {
        cart[index].cout++;
        $("#counttitems" + index).text(cart[index].cout)
    }
}