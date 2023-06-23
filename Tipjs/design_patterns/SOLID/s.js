class Order {
    constructor(userId) {
        this.userId = userId
        this.timeOrder = Date.now()
        this.products = []
    }
}

class OrderManager {
    constructor() {
        this.order = null
    }

    // createOrder
    createOrder(userId) {
        this.order = new Order(userId)

        return this.order
    }

    // addProduct
    addProduct(product) {
        this.order.products.push(product)
    }

    // getOrder
    getOrder() {
        return this.order
    }

    isValid() {
        return this.order.products.length
    }

    // sendMail
    sendOrder() {
        if (this.isValid()) {
            // sendMail
            // await fetch('https://ecommerce.com/api/orders')
            // console.log(`SendMail TO https://ecommerce.com/api/orders success::`, this.order)
            this.orderSendMail = new SendMailOrder()

            return this.orderSendMail.SendMail(this.order)
        }

        return 1
    }
}

class SendMailOrder {
    SendMail(order) {
        console.log(`SendMail TO https://ecommerce.com/api/orders success::`, order)
    }
}

const orderManager = new OrderManager();

orderManager.createOrder('userId-10001')
orderManager.addProduct({ productId: 101, quantity: 2, price: 1000, unit: 'USD' })
orderManager.addProduct({ productId: 102, quantity: 3, price: 2000, unit: 'USD' })

console.log(`Order Info:: `, orderManager.getOrder())
console.log(`SendMail::`, orderManager.sendOrder())