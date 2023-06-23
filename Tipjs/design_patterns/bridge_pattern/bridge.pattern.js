// define PaymentProcess

class PaymentProcess {
    pay(amuont) {

    }
}

// define VisaPaymentProcess class
class VisaPaymentProcess extends PaymentProcess {
    constructor(cardNumber, expiryDate, cvv) {
        super()
        this.cardNumber = cardNumber
        this.expiryDate = expiryDate
        this.cvv = cvv
    }

    // implement the pay method
    pay(amuont) {
        console.log(`Paying ${amuont} USD with visa card ${this.cardNumber} ...`)
        // TODO: Implement logic...
    }
}

// define MomoPaymentProcess
class MomoPaymentProcess extends PaymentProcess {
    constructor(phoneNumber) {
        super()
        this.phoneNumber = phoneNumber
    }

    // implement the pay method
    pay(amuont) {
        console.log(`Paying ${amuont} USD with momo card ${this.phoneNumber} ...`)
        // TODO: Implement logic...
    }
}

// define MemberRegistration
class MemberRegistration {
    constructor(paymentProcess) {
        this.paymentProcess = paymentProcess
    }

    // regis
    register() {
        const amuont = 100 // the registration fee in USD
        this.paymentProcess.pay(amuont)
        console.log(`Registered for Youtube menbership!`)

    }
}

// Create visa payment

const visaPaymentProcess = new VisaPaymentProcess('1234.4567.xxxx', '12/25', '123')
const membership = new MemberRegistration(visaPaymentProcess)
membership.register()

const momoPaymentProcess = new MomoPaymentProcess('0123456789',)
const membership1 = new MemberRegistration(momoPaymentProcess)
membership1.register()

