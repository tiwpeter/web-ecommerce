/*ฟังชั่น เปิดกล่องสินค้า + เพิ่มสินค้า ลงใน cart*/
// Function to open product details
/*$(document).ready(() => {
    // Your existing AJAX and product rendering logic

    // Use event delegation for handling product clicks
    $("#product-container").on("click", ".product-item", function() {
        var productId = $(this).data("product-id");
        openProduct(productId);
    });

    function openProduct(id) {
        // Implementation remains the same
        // Ensure product is defined and has valid data
        if (product && product.categories && product.categories.length > 0) {
            // Find product by id
            var productToDisplay = getProductById(id);
            if (productToDisplay) {
                // Populate modal with product details
                console.log('Product to display:', productToDisplay); // Log the product details
                $("#mdd-img").attr('src', productToDisplay.imageUrl);
                $('#mdd-name').text(productToDisplay.name);
                $('#mdd-price').text(`฿${productToDisplay.price}`);
                $('#mdd-desc').text(productToDisplay.desc);
                
                // Convert rating to stars
                var stars = "";
                for (var i = 0; i < productToDisplay.rating; i++) {
                    stars += "★";
                }
                // Append remaining stars for a total of 5
                for (var i = productToDisplay.rating; i < 5; i++) {
                    stars += "☆";
                }
    
                // Set HTML of #mdd-rating to stars
                $('#mdd-rating').html(stars);
    
                // Show modal
                $('#modal-ID').show();
            } else {
                console.log(`Product with id ${id} not found.`);
            }
        } else {
            console.log('Product data is not available.');
        }
    }
});


// Function to retrieve product by id
/*
function getProductById(id) {
    // Use flatMap to flatten the products array and find product by id
    return product.categories.flatMap(category => category.products).find(product => product.id === id);
}
*/
function closeModal() {
    // ปิด modal
    $(".modal").hide();
}

/*funtion + */

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


/********************************************************************** */

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