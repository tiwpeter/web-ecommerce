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
            html += `
            <div class="cartlist-item">
                <div class="carlist-left" style="display: flex;">
                    <img src="${cart[i].img}" alt="">
                    <div class="carlist-detail">
                        <p style="font-size: 1.5vw;">${cart[i].name}</p>
                        <p style="font-size: 1.2vw;">${cart[i].price} </p> <!-- Display price per item -->
                    </div>
                    <div class="carlist-right" style="display: flex;align-items: center;justify-content: flex-end;">
                        <p class="btnc" onclick="deinitems('-', ${i})">-</p>
                        <p id="counttitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                        <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                    </div>
                </div>
            </div>
            `;
            totalPrice += itemTotalPrice; // เพิ่มราคาของสินค้าแต่ละชิ้นเข้าไปในราคารวมทั้งหมด
        }
        $('#mycart').html(html);
        $('#totalPrice').text(totalPrice); // Display total price at the bottom
    } else {
        $("#mycart").html('<p>Not found product list</p>');
        $('#totalPrice').text('0'); // If cart is empty, reset total price to 0
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

            // Update item price display
            var itemTotalPrice = cart[index].price * cart[index].count;
            $("#mycart .carlist-detail:nth-child(" + (index + 1) + ") p:nth-child(2)").text(`${cart[index].price} x ${cart[index].count} = ${itemTotalPrice}`);

            // Update total price
            updateTotalPrice();
        }
    } else if (action == '+') {
        cart[index].count++;
        $("#counttitems" + index).text(cart[index].count);

        // Update item price display
        var itemTotalPrice = cart[index].price * cart[index].count;
        $("#mycart .carlist-detail:nth-child(" + (index + 1) + ") p:nth-child(2)").text(`${cart[index].price} x ${cart[index].count} = ${itemTotalPrice}`);

        // Update total price
        updateTotalPrice();
    }
}


//updateTotalPrice(); // เรียกใช้งานฟังก์ชัน updateTotalPrice เพื่ออัปเดตราคารวมทั้งหมด

function updateTotalPrice() {
    var totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price * cart[i].count;
    }
    $('#totalPrice').text(totalPrice); // Update total price display
}




// เมื่อมีการคลิกที่ปุ่มหรือองค์ประกอบที่เชื่อมโยงไปยัง openclass ใน HTML


//โดยการเพิ่มฟังก์ชัน openclass และตั้งชื่อให้ตรงกับที่คุณใช้ใน HTML onclick จะช่วยแก้ไขปัญหา "Uncaught ReferenceError: openclass is not defined" และทำให้การทำงานของฟังก์ชันเรียกใช้งาน rendercart ได้ถูกต้องตามที่คาดหวังไว้




// cout + price
// total