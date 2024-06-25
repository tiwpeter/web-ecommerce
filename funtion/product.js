$(document).ready(() => {
    // Ajax request to get product data
    $.ajax({
        method: 'GET',
        url: 'http://localhost/web-shipping-compliebeforefuntion/api/getdata.php',
        success: function(response) {
            console.log('Response:', response); // Log the entire response for debugging

            if (response && response.categories && response.categories.length > 0) {
                product = response;

                var html = '';
                product.categories.forEach(category => {
                    if (category.products && category.products.length > 0) {
                        category.products.forEach(product => {
                            html += `
                                <div class="product-item" data-product-id="${product.id}">
                                    <img src="${product.imageUrl}" alt="${product.name}">
                                    <div>
                                        <h3>${product.name}</h3>
                                    </div>
                                    <div class="price-flex1">
                                        <div class="price">฿${product.price}</div>
                                        <span class="discount">-57%</span>
                                    </div>
                                    <div class="product-meta">
                                        <span class="rating" data-rating="${product.rating}"></span>
                                        <span class="discount">(${product.comment})</span>
                                    </div>
                                </div>
                            `;
                        });
                    }
                });

                $("#product-container").append(html);

                $(".rating").each(function() {
                    var rating = parseInt($(this).attr("data-rating"));
                    var stars = "";
                    for (var i = 0; i < rating; i++) {
                        stars += "★";
                    }
                    $(this).html(stars);
                });

                // Set click event for product items
                $("#product-container").on("click", ".product-item", function() {
                    var productId = $(this).data("product-id");
                    openProduct(productId);
                });

                // Set click event for close button in modal
                $(".bb-contrel button.btn").on("click", function() {
                    closeModal();
                });

                // Set click event for add to cart button in modal
                $(".bb-contrel button.btn-buy").on("click", function() {
                    addcart();
                });

            } else {
                console.log('Invalid response format or server error.');
            }
        },
        error: function(err) {
            console.log('AJAX error:', err);
        }
    });
});

