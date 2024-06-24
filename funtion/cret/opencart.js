/* ฟังชั่นเปิดตระกร้า 58.23 */
function openclass(){
    $('#modalCart').css('display','flex')
    rendercart();
}
/**URL ที่คุณใช้ในการกำหนด src ของรูปภาพมีรูปแบบ ./img/${cart[i].img} ซึ่งมีความหมายว่า URL เริ่มต้นที่โฟลเดอร์ img ในโปรเจคของคุณ แต่น่าจะไม่ตรงกับที่อยู่ URL จริงของรูปภาพที่ต้องการโหลด ซึ่งสร้างปัญหาในการเรียก URL อย่างถูกต้อง */
/**โดยใช้ ${cart[i].img} เพื่ออ้างถึง URL ของรูปภาพที่มาจากข้อมูลสินค้าที่ถูกต้องและสมบูรณ์ ซึ่งจะช่วยแก้ไขปัญหาของการโหลดรูปภาพที่ผิดพลาดในฟังก์ชัน rendercart() ของคุณได้ */


/*cout fix cout*/


/* ดูดข้อมูล จาก openProduct var cart มาเก๋็บ */
function rendercart() {
    if (cart.length > 0) {
        var html = '';
        var totalPrice = 0;
        for (let i = 0; i < cart.length; i++) {
            var itemTotalPrice = cart[i].price * cart[i]['count']; // แก้ไขการเข้าถึงค่า count ให้ใช้วงเล็บก้ามปู
            totalPrice += itemTotalPrice;
            html += `
            <div class="cartlist-item">
                <div class="carlist-left">
                    <img src="${cart[i].img}" alt="">
                    <div class="carlist-detail">
                        <p style="font-size: 1.5vw; color: blue;">${cart[i].name}</p>
                        <p style="font-size: 1.2vw; color: blue;">${cart[i].price * cart[i]['count']}</p> <!-- แก้ไขการเข้าถึงค่า count ให้ใช้วงเล็บก้ามปู -->
                    </div>
                </div>
                <div class="carlist-right">
                    <p onclick="deinitems('-', ${i})" class="btnc" >-</p>
                    <p id="counttitems${i}" style="margin: 0 20px; color: blue;">${cart[i]['count']}</p>
                    <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                </div>
            
            </div>`;
            $('#totalPrice' + i).text(itemTotalPrice); // แสดงราคารวมของแต่ละรายการสินค้า
        }
        $('#mycart').html(html);
        $('#totalPrice').text(totalPrice); // แสดงราคารวมทั้งหมดในตะกร้า
    } else {
        $("#mycart").html('<p>Not found product list</p>');
    }
}