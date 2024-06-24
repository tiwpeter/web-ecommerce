$(document).ready(function() {
    // ดึงข้อมูลจาก getdata.php
    $.ajax({
        url: 'http://localhost/web-shipping-compliebeforefuntion/api/getdata.php', // เปลี่ยน URL เป็นแหล่งข้อมูล JSON ที่คุณต้องการ
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            // console.log("Response from server:", response); // แสดงข้อมูลที่ได้รับจากเซิร์ฟเวอร์ใน console

            var categories = response.categories;
            var categoriesHtml = '';

            // วนลูปผ่านแต่ละหมวดหมู่
            $.each(categories, function(index, category) {
                var categoryText = category.name; // categoryText = name first json
                var categoryIMG = category.img;   // ++ img 
                // data-category =  data in  category

                // แสดง URL ของรูปภาพใน console
                console.log("Category Image URL:", categoryIMG);

                categoriesHtml += `
                <div 
                    class="category-item"
                    data-category='${JSON.stringify(category)}' 
                >
                    ${categoryIMG ? `<img src="${categoryIMG}" alt="${categoryText}" />` : ''}
                    <h3>${categoryText}</h3>
                </div>`;
            });

            // แสดงข้อมูลใน #categoryHeading
            $('#categoryHeading').html(categoriesHtml);

            // ผูกเหตุการณ์คลิกกับแต่ละหมวดหมู่
            $('.category-item').on('click', function() {
                var selectedCategory = $(this).data('category');
                // เก็บหมวดหมู่ที่เลือกใน sessionStorage
                sessionStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));
                // เปลี่ยนหน้าไปยังหน้าแสดงข้อมูล
                window.location.href = 'test5cp.html';
            });
        }
    });
});
