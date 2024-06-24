$(document).ready(function() {
    // Retrieve selectedCategory from sessionStorage
    var selectedCategory = JSON.parse(sessionStorage.getItem('selectedCategory'));
    console.log('Value of selectedCategory:', selectedCategory);
    
    sessionStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));

    // Retrieve selectedCategory from sessionStorage
    var storedCategory = JSON.parse(sessionStorage.getItem('selectedCategory'));
    console.log('Value of storedCategory:', storedCategory);

    if (storedCategory) {
        var html = '';
        var displayedBrands = new Set();

        // Loop through each product and create HTML for display
        $.each(storedCategory.products, function(index, product) {
            if (!displayedBrands.has(product.brand)) {
                html += `
                    <div class="box-container category" data-category-id="${product.id}">
                        <div class="box"></div>
                        <div class="boxing">
                            <span>${product.brand}</span>
                        </div>
                        <div class="products" id="products-${product.id}" style="display:none;">
                            <!-- Products will be dynamically inserted here -->
                        </div>
                    </div>`;
                displayedBrands.add(product.brand);
            }
        });

        // Display the categories
        $('#uibox').html(html);

        // Add click function for categories
        $(document).on('click', '.category', function() {
            var productId = $(this).data('category-id');

            // Remove checkmark from all other boxes
            $('.box').html('');

            // Add checkmark to the clicked box
            $(this).find('.box').html('<i class="fas fa-check" style="color: #ee4d2d;"></i>');

            // Hide products of previously opened categories
            $('.products').slideUp();

            // Show products for the clicked category
            showProducts(productId);
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
