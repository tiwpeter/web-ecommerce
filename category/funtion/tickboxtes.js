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
            // Map over products to generate the HTML for each product
            productsHtml += products.map(product => `
                <div class="product-item" data-product-id="${product.id}"> 
                    <div class="test">
                        <div class="product">
                            <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                            <div class="se">
                                <div class="imgsecond">
                                    <img src="${product.imgsecond}" alt="${product.name}" class="product-image">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="ws">
                        <div class="product-header">
                            <div class="s1">
                                <span class="store">LazMall</span>
                            </div>
                            <div class="s2">
                                <h5>${product.name}</h5>
                            </div>
                        </div>
                        
                        <div class="price-discount">
                            <div class="price">${product.price}</div>
                            <div class="discount">${product.sale}</div>
                        </div>

                        <div class="dws">
                            <div class="product-meta">
                                <span class="sold">${product.sold}</span>
                                <span> | </span>
                                <span class="rating">${product.rating}</span>
                            </div>
                            <div class="ch">
                                <span class="location">Chachoengsao</span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');

            return productsHtml;
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
