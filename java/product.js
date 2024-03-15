var product;

    $(document).ready(() => {


        $.ajax({
            method: 'get',
            url: './api/getallproduct.php',
            //ฟังชั่นคลืกดูดdetail สินค้า จากข้อมูลgetallproduct
            success: function(response) {
                console.log(response);
                if (response.RespCode == 200) {
                    product = response.Result;
                    var html = '';
                    for (let i = 0; i < product.length; i++) {
                        html += `
                        <div class="product-item ${product[i].type}" onclick="openproduct(${i})"> 
                            <img class="product-img" src="${product[i].image}">
                            <p style="font-size: 1.5vw;">${product[i].title}</p>
                            <p style="font-size: 1.2vw;"> ฿${product[i].price}</p>

                        </div>
                        `;
                    }
                    $("#productnonsa").html(html);
                }
            },
            error: function(err) {
                console.log(err);
            }
        });


    })
