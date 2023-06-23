/**
 * Giảm giá khi người dùng đặt trước 1 sản phẩm của VINFAST
 * @param {*} originalPrice
 * @return
*/
function preOederPrice(originalPrice) {
    return originalPrice * 0.8
}

/**
 * Tiếp tục thêm tính năng khuyến mại thông thường, ví dụ nếu  giá góc < 200 thì giảm 10%, còn > thì giảm tối đa 30
 * @param {*} originalPrice
 * @return
*/
function promotionPrice(originalPrice) {
    return originalPrice < 200 ? originalPrice * 0.9 : originalPrice - 30
}

/**
 * Giá mặc định
 * @param {*} originalPrice
 * @return
*/
function defaultPrice(originalPrice) {
    return originalPrice
}

function dayPrice(originalPrice) {
    return originalPrice * 0.6
}

// Và chúng ta sẽ sửa đổi lại như sau
// function getPrice(originalPrice, typePromotion = 'default') {
//     if (typePromotion === 'preOrder') {
//         return promotionPrice(originalPrice)
//     }

//     if (typePromotion === 'promotion') {
//         return promotionPrice(originalPrice)
//     }

//     if (typePromotion === 'default') {
//         return promotionPrice(originalPrice)
//     }
// }

const getPriceStrategies = {
    preOrder: preOederPrice,
    promotion: promotionPrice,
    dayPrice,
    default: defaultPrice,
}

function getPrice(originalPrice, typePromotion = 'default') {
    return getPriceStrategies[typePromotion](originalPrice)
}

console.log(`-------->`, getPrice(200, 'preOrder'))