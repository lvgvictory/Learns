// Interface đại diện cho chiến lược
interface PaymentStrategy {
  pay(amount: number): void;
}

// Các lớp cụ thể triển khai chiến lược
class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Thanh toán ${amount}đ bằng thẻ tín dụng`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Thanh toán ${amount}đ qua PayPal`);
  }
}

class BankTransferPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Thanh toán ${amount}đ bằng chuyển khoản ngân hàng`);
  }
}

// Lớp context sử dụng chiến lược
class ShoppingCart {
  private paymentStrategy: PaymentStrategy;

  constructor(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  setPaymentStrategy(paymentStrategy: PaymentStrategy): void {
    this.paymentStrategy = paymentStrategy;
  }

  checkout(amount: number): void {
    this.paymentStrategy.pay(amount);
  }
}

// Sử dụng
const cart = new ShoppingCart(new CreditCardPayment());
cart.checkout(100);

cart.setPaymentStrategy(new PayPalPayment());
cart.checkout(200);

cart.setPaymentStrategy(new BankTransferPayment());
cart.checkout(300);
