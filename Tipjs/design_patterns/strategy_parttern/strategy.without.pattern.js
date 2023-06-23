function getPrice(originalPrice, typePromotion = 'default') {
    // Giảm giá khi người dùng đặt trước 1 sản phẩm của VINFAST
    if (typePromotion === 'preOrder') {
        return originalPrice * 0.8
    }// Ở gia đoạn này nếu bạn đã biết về SOLID thì nó đã phá vỡ nguyên tắc đầu tiên, Đó là nguyên tắc đơn trách nhiệm

    // Tiếp tục thêm tính năng khuyến mại thông thường, ví dụ nếu  giá góc < 200 thì giảm 10%, còn > thì giảm tối đa 30
    if (typePromotion === 'promotion') {
        return originalPrice <= 200 ? originalPrice * 0.9 : originalPrice - 30;
    }

    // Đến ngày blackFriday promotion
    if (typePromotion === 'blackFriday') {
        return originalPrice <= 200 ? originalPrice * 0.9 : originalPrice - 50;
    }

    // Thời xuâ chưa có marketing như bây giờ
    if (typePromotion === 'default') {
        return originalPrice
    }
}

console.log(`---------> PRICE:: `, getPrice(200, 'preOrder'))