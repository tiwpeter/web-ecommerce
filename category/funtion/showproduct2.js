// Function to generate products HTML
function generateProductsHtml(products) {
    var productsHtml = '';
        // map id product loop  ***
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