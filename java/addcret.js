/***ไม่ใช้/
/* ฟังชั่นนำเข้าสินค้า */
im


/* loop ถ้าใช่ก็เพิ่มเข้าคลัง +1มั้ง */
/* pass คือ ture แสดงว่ามันเข้าถึงแน่นอน */
var cart=[];
function addcart(){
var pass = true;

for (let i = 0; i < cart.length; i++) {
    if (productindex == cart[i].index){
        console.log ('found same product')
        cart[i].cout++;
        pass = false;
    }
}/* 52.16 */

if(pass) {
    var obj ={
        index:productindex,
        id:product[productindex].id,
        name:product[productindex].title,
        price:product[productindex].price,
        img:product[productindex].image,
        cout:1
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
  
   $("#cartcout").css('display','flex').text(cart.length)


}