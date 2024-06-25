function buynow() {
    $.ajax({
        method: "POST",
        url: "./api/buynow.php",
        data: { product: cart }, // ต้องแน่ใจว่าตัวแปร cart ถูกกำหนดไว้ก่อนใช้งาน
        success: function(response) {
            console.log(response); // Log the response on success
            // You can add further handling here if needed
        },
        error: function(xhr, status, error) {
            console.log("AJAX request failed:", status, error);
            // Handle errors here, such as displaying an alert to the user
        }
    });
}