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

var cart = [];

function addToCart(productId) {
    // Check if the product is already in the cart
    var existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // Increment the quantity if the product is already in the cart
        existingItem.quantity++;
    } else {
        // Find the product by id and add it to the cart with initial quantity
        var productToAdd = getProductById(productId);

        if (productToAdd) {
            var cartItem = {
                id: productToAdd.id,
                name: productToAdd.name,
                price: productToAdd.price,
                img: productToAdd.imageUrl,
                quantity: 1 // Initial quantity is 1
            };

            cart.push(cartItem);
        } else {
            console.log(`Product with id ${productId} not found.`);
            return; // Exit function if product not found
        }
    }

    console.log('Cart:', cart); // Log the updated cart

    // Update UI or perform any other actions (e.g., show success message)
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product added to cart successfully",
        showConfirmButton: false,
        timer: 1500
    });

    // Update cart count display
    $('#cartcount').css('display', 'flex').text(cart.length);
}

function buynow() {
    var productId = product.id;
    addToCart(productId);
}