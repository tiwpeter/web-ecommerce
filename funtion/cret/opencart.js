/* ฟังชั่นเปิดตระกร้า 58.23 */
function openclass(){
    $('#modalCart').css('display','flex')
    rendercart();
}

function rendercart() {
    if (cart.length > 0) {
        var html = '';
        var totalPrice = calculateTotalPrice(); // เรียกใช้ฟังก์ชัน calculateTotalPrice() เพื่อคำนวณราคารวมทั้งหมด
        for (let i = 0; i < cart.length; i++) {
            var itemTotalPrice = cart[i].price * cart[i].count; // ราคารวมของแต่ละรายการสินค้า
            html += `
            <div class="cartlist-item">
                <div class="carlist-left" style="display: flex;">
                    <img src="${cart[i].img}" alt="">
                    <div class="carlist-detail">
                        <p style="font-size: 1.5vw;">${cart[i].name}</p>
                        <p style="font-size: 1.2vw;">${cart[i].price * cart[i].count}</p>
                    </div>
                    <div class="carlist-right" style="display: flex; align-items: center; justify-content: flex-end;">
                        <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                        <p id="counttitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                        <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                    </div>
                </div>
            </div>`;
            $('#totalPrice' + i).text(itemTotalPrice); // แสดงราคารวมของแต่ละรายการสินค้า
        }
        $('#mycart').html(html);
        $('#totalPrice').text(totalPrice); // แสดงราคารวมทั้งหมดในตะกร้า
    } else {
        $("#mycart").html('<p>ไม่พบรายการสินค้า</p>');
        $('#totalPrice').text('0'); // ถ้าไม่มีสินค้าในตะกร้าให้แสดงราคารวมเป็น 0
    }
}

function deinitems(action, i) {
    if (action == '-') {
        if (cart[i].count > 0) {
            cart[i].count--;
        }
    } else if (action == '+') {
        cart[i].count++;
    }
    
    rendercart(); // เรียกใช้ฟังก์ชัน rendercart เพื่ออัพเดตหน้าจอตะกร้าสินค้า
}

function calculateTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price * cart[i].count;
    }
    return totalPrice;
}