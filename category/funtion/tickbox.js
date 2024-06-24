$(document).ready(function() {
    // Retrieve selectedCategory from sessionStorage
    var selectedCategory = JSON.parse(sessionStorage.getItem('selectedCategory'));
    console.log('Value of selectedCategory:', selectedCategory);
    
    sessionStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));

    // Retrieve selectedCategory from sessionStorage
    var storedCategory = JSON.parse(sessionStorage.getItem('selectedCategory'));
    console.log('Value of storedCategory:', storedCategory);

    if (storedCategory) {
        // Function to generate categories HTML
        function generateCategoriesHtml(categories) {
            var html = '';
            var productsByBrand = {};

            // Group products by brand
            $.each(categories.products, function(index, product) {
                if (!productsByBrand[product.brand]) {
                    productsByBrand[product.brand] = [];
                }
                productsByBrand[product.brand].push(product);
            });

            // Generate HTML for each brand and their products
            $.each(productsByBrand, function(brand, products) {
                html += `
                    <div class="box-container category" data-brand="${brand}">
                        <div class="box"></div>
                        <div class="boxing">
                            <span>${brand}</span>
                        </div>
                    </div>`;
            });

            return html;
        }

        // Function to generate products HTML
        function generateProductsHtml(products) {
            var productsHtml = '';
        
            productsHtml += products.map(product => `
                <div class="product-item">
                    <div class="list1">
                        <div class="product">
                            <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                            <div class="se">
                                <div class="imgsecond">
                                    <img src="${product.imgsecond}" alt="${product.name}" class="product-image">
                                </div>
                            </div>
                        </div>
        
                        <div class="list">
                            <div class="catetitle">${product.name}</div>
        
                            <div class="price-container">
                                <div class="price-cate">
                                    <span class="pricecate">฿${product.price}</span>
                                </div>
                                <div class="dddvs">
                                    <span class="preslae">-${product.sale}% Off</span>
                                </div>
                            </div>
        
                            <div class="sold">
                                <span class="sold">${product.soldout}k sold</span>
                                <span class="brHcE"></span>
                                <div>
                                    <span class="rating">
                                    ${generateStarRating(product.rating)}
                                    </span>
                                </div>
                                <div>
                                <span class="reviews">
                                    (${product.reviews})
                                </span>
                                </div>
                            </div>
        
                        </div>
                    </div>
                </div>
            `).join('');
        
            return productsHtml;
        }
        
        function generateStarRating(rating) {
            const fullStars = Math.floor(rating); // Number of full stars
            const halfStars = Math.ceil(rating - fullStars); // Number of half stars
        
            let starsHtml = '';
        
            // Adding full stars
            for (let i = 0; i < fullStars; i++) {
                starsHtml += '<i class="fas fa-star"></i>';
            }
        
            // Adding half stars
            if (halfStars === 1) {
                starsHtml += '<i class="fas fa-star-half-alt"></i>';
            }
        
            // Adding empty stars (if needed)
            const emptyStars = 5 - fullStars - halfStars;
            for (let i = 0; i < emptyStars; i++) {
                starsHtml += '<i class="far fa-star"></i>';
            }
        
            return starsHtml;
        }
        

        // Insert categories HTML into #uibox
        $('#uibox').html(generateCategoriesHtml(storedCategory));

        // Add click function for categories
        $(document).on('click', '.category', function() {
            var brand = $(this).data('brand');
            var selectedProducts = storedCategory.products.filter(product => product.brand === brand);

            // Remove checkmark from all other boxes
            $('.box').html('');

            // Add checkmark to the clicked box
            $(this).find('.box').html('<i class="fas fa-check" style="color: #ee4d2d;"></i>');

            // Hide products of previously opened categories
            $('.products').slideUp();

            // Generate and insert products HTML into #productContainer and show it
            $('#productContainer').html(generateProductsHtml(selectedProducts)).slideDown();
        });

        // Add click function for rating stars
        $('.star').on('click', function() {
            var rating = $(this).data('rating');
            filterProductsByRating(rating);
        });
    } else {
        // If no category is selected
        $('#uibox').html('<h1>No categories found</h1>');
    }
});
