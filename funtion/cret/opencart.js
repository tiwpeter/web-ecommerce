// bring value for cert array  to Can be stored for openproduct bring display
function openclass() {
    $('#modalCart').css('display', 'flex');
    rendercart();
}

function rendercart() {
    if (cart.length > 0) {
        var html = '';
        var totalPrice = 0;
        for (let i = 0; i < cart.length; i++) {
            var itemTotalPrice = cart[i].price * cart[i].count;
            totalPrice += itemTotalPrice;
            html += `
            <div class="cartlist-item">
                <div class="carlist-left" style="display: flex;">
                    <img src="${cart[i].img}" alt="">
                    <div class="carlist-detail">
                        <p style="font-size: 1.5vw;">${cart[i].name}</p>
                        <p style="font-size: 1.2vw;">${itemTotalPrice}</p> <!-- Display total price for the item -->
                    </div>
                    <div class="carlist-right" style="display: flex;align-items: center;justify-content: flex-end;">
                        <p class="btnc" onclick="deinitems('-', ${i})">-</p>
                        <p id="counttitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                        <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                    </div>
                </div>
            </div>
            `;
        }
        $('#mycart').html(html);
        $('#totalPrice').text(totalPrice); // Display total price at the bottom
    } else {
        $("#mycart").html('<p>Not found product list</p>');
    }
}
function deinitems(action, index) {
    if (action == '-') {
        if (cart[index].count > 0) {
            cart[index].count--;
            $("#counttitems" + index).text(cart[index].count);

            if (cart[index].count <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: '',
                });
            }
        }
    } else if (action == '+') {
        cart[index].count++;
        $("#counttitems" + index).text(cart[index].count);

        var itemTotalPrice = cart[index].price * cart[index].count;
        $("#mycart .carlist-detail:nth-child(" + (index + 1) + ") p:nth-child(2)").text(itemTotalPrice); // Update item price display

        // Update total price
        var totalPrice = 0;
        for (let i = 0; i < cart.length; i++) {
            totalPrice += cart[i].price * cart[i].count;
        }
        $("#totalPrice").text(totalPrice); // Update total price display
    }
}


//updateTotalPrice(); // เรียกใช้งานฟังก์ชัน updateTotalPrice เพื่ออัปเดตราคารวมทั้งหมด

function updateTotalPrice() {
    var totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price * cart[i].count;
    }
    $('#totalPriceDisplay').text("Total: " + totalPrice); // แสดงราคารวมทั้งหมดในตะกร้า
}






// เมื่อมีการคลิกที่ปุ่มหรือองค์ประกอบที่เชื่อมโยงไปยัง openclass ใน HTML


//โดยการเพิ่มฟังก์ชัน openclass และตั้งชื่อให้ตรงกับที่คุณใช้ใน HTML onclick จะช่วยแก้ไขปัญหา "Uncaught ReferenceError: openclass is not defined" และทำให้การทำงานของฟังก์ชันเรียกใช้งาน rendercart ได้ถูกต้องตามที่คาดหวังไว้




// cout + price
// total