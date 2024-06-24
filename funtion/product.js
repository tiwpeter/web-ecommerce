        // Define product globally
        var product;

        // Function to get product by id
        function getProductById(id) {
            if (product && product.categories) {
                for (var i = 0; i < product.categories.length; i++) {
                    var category = product.categories[i];
                    if (category.products) {
                        var foundProduct = category.products.find(p => p.id === id);
                        if (foundProduct) {
                            return foundProduct;
                        }
                    }
                }
            }
            return null;
        }

        // Function to open product
        function openProduct(id) {
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

        $(document).ready(() => {
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
                                                <span class="discount">(${product.soldout})</span>
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
                    } else {
                        console.log('Invalid response format or server error.');
                    }
                },
                error: function(err) {
                    console.log('AJAX error:', err);
                }
            });

            $("#product-container").on("click", ".product-item", function() {
                var productId = $(this).data("product-id");
                openProduct(productId);
            });
        });