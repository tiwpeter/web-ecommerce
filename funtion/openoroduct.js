// Function to open product
function openProduct(id) {
    console.log(id); // Check if the id is correctly passed in
    productindex = id;
    console.log('productindex:', productindex); // Log the current value of productindex
    if (product && product.categories && product.categories.length > 0) {
        var productToDisplay = getProductById(id);
        if (productToDisplay) {
            console.log('Product to display:', productToDisplay); // Log the product details
            $("#mdd-img").attr('src', productToDisplay.imageUrl);
            
            if (productToDisplay.imgsecond) {
                $("#mdd-imgsecond").attr('src', productToDisplay.imgsecond);
            } else {
                console.log('No second image available.');
                $("#mdd-imgsecond").attr('src', ''); // Clear the src if no second image
            }
            
            $('#mdd-name').text(productToDisplay.name);
            $('#mdd-price').text(`฿${productToDisplay.price}`);
            $('#mdd-desc').text(productToDisplay.desc);

            var stars = "";
            for (var i = 0; i < productToDisplay.rating; i++) {
                stars += "★";
            }
            for (var i = productToDisplay.rating; i < 5; i++) {
                stars += "☆";
            }
            $('#mdd-rating').html(stars);

            $('#modal-ID').show();
        } else {
            console.log(`Product with id ${id} not found.`);
        }
    } else {
        console.log('Product data is not available.');
    }
}





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


// find product for id
function getProductById(productId) {
    if (product && product.categories && product.categories.length > 0) {
        // Loop through categories to find the product
        for (let i = 0; i < product.categories.length; i++) {
            const category = product.categories[i];
            if (category.products && category.products.length > 0) {
                // Loop through products in the category
                for (let j = 0; j < category.products.length; j++) {
                    const prod = category.products[j];
                    if (prod.id === productId) {
                        console.log(`Found product with id ${productId}:`, prod); // Log the found product
                        return prod; // Return the product if found
                    }
                }
            }
        }
    }
    console.log(`Product with id ${productId} not found.`); // Log if product with productId is not found
    return null; // Return null if product with productId is not found
}




var cart = [];

//ใช้ getProductById ที่ได้รับการเขียนมาแล้ว เพื่อค้นหาสินค้าจาก productId ในโครงสร้างข้อมูล product ที่ถูกดึงมาแล้ว และคืนค่าสินค้าที่ตรงกับ productId หากพบ หรือคืนค่า null หากไม่พบ
// use  getProductById inteand productindex
// productindex = id =102
// getProductById = find 102 =convert is data 

// Define addcart function in global scope
function addcart() {
    if (typeof product === 'undefined' || typeof productindex === 'undefined') {
        console.log('Product data or index is undefined.');
        return;
    }

    var productId = productindex;
    console.log('Attempting to add product with productId:', productId);

    // Find the product in product data
    var productToCart = getProductById(productId);

    if (productToCart) {
        // Check if the product already exists in cart
        var existingProductIndex = -1;
        for (let i = 0; i < cart.length; i++) {
            if (productId === cart[i].id) {
                existingProductIndex = i;
                break;
            }
        }

        // If product exists in cart, increase count
        if (existingProductIndex !== -1) {
            console.log('Found same product in cart');
            cart[existingProductIndex].count++;
        } else {
            // If product not in cart, add it
            var obj = {
                index: productId,
                id: productToCart.id,
                name: productToCart.name,
                price: productToCart.price,
                img: productToCart.imageUrl,
                count: 1 // Set count to 1 when a new product is added to cart
            };
            cart.push(obj);
            console.log('Added to cart:', obj);
        }
    } else {
        console.log('Product with productId:', productId, 'not found or not valid.');
    }

    console.log('Current Cart:', cart); // Log the current state of the cart after adding/updating product
}