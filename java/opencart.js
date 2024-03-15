/* ฟังชั่นเปิดตระกร้า 58.23 */
function openclass(){
    $('#modalCart').css('display','flex')
    rendercart();
}
/**URL ที่คุณใช้ในการกำหนด src ของรูปภาพมีรูปแบบ ./img/${cart[i].img} ซึ่งมีความหมายว่า URL เริ่มต้นที่โฟลเดอร์ img ในโปรเจคของคุณ แต่น่าจะไม่ตรงกับที่อยู่ URL จริงของรูปภาพที่ต้องการโหลด ซึ่งสร้างปัญหาในการเรียก URL อย่างถูกต้อง */
/**โดยใช้ ${cart[i].img} เพื่ออ้างถึง URL ของรูปภาพที่มาจากข้อมูลสินค้าที่ถูกต้องและสมบูรณ์ ซึ่งจะช่วยแก้ไขปัญหาของการโหลดรูปภาพที่ผิดพลาดในฟังก์ชัน rendercart() ของคุณได้ */



/* ดูดข้อมูล จาก openProduct var cart มาเก๋็บ */
function rendercart(){
    if(cart.length > 0){
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `
            <div class="cartlist-item">
            <div class="carlist-left">
                <img src="${cart[i].img}" alt="">
                <div class="carlist-detail">
                    <p style="font-size: 1.5vw;">${cart[i].name}</p>
                    <p style="font-size: 1.2vw;">${cart[i].price * cart[i].cout}</p>
                </div>
            </div>
            <div class="carlist-right">
                <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                <p id="counttitems${i}" style="margin: 0 20px;">${cart[i].cout}</p>
                <p onclick="deinitems('+', ${i})" class="btnc">+</p>
            </div>
        </div>`;
        }
        $('#mycart').html(html);
    } else {
        $("#mycart").html('<p>Not found product list</p>');
    }
}