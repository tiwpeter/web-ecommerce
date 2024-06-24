/* ฟังชั่นนำเข้าสินค้า */
var cart = [];

function addcart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if (productindex == cart[i].index) {
            console.log('found same product')
            cart[i].count++;
            pass = false;
        }
    } /* 52.16 */

    if (pass) {
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].title,
            price: product[productindex].price,
            img: product[productindex].image,
            count: 1
        };

        cart.push(obj)
    }
    console.log(cart)

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
    });

    $("#cartcount").css('display', 'flex').text(cart.length)
}