namespace sp {
  interface PaymentStrategy {
    pay(amount: number): void;
  }

  class CreditCardPayment implements PaymentStrategy {
    pay(amount: number): void {
      console.log(`Paying ${amount} using Credit Card.`);
    }
  }

  class PayPalPayment implements PaymentStrategy {
    pay(amount: number): void {
      console.log(`Paying ${amount} using PayPal.`);
    }
  }

  class BitcoinPayment implements PaymentStrategy {
    pay(amount: number): void {
      console.log(`Paying ${amount} using Bitcoin.`);
    }
  }

  class PaymentContext {
    private strategy: PaymentStrategy;

    constructor(strategy: PaymentStrategy) {
      this.strategy = strategy;
    }

    setStrategy(strategy: PaymentStrategy) {
      this.strategy = strategy;
    }

    executeStrategy(amount: number) {
      this.strategy.pay(amount);
    }
  }

  const amount = 1000;

  // Sử dụng chiến lược thanh toán bằng thẻ tín dụng
  let paymentContext = new PaymentContext(new CreditCardPayment());
  paymentContext.executeStrategy(amount);

  // Chuyển đổi chiến lược thanh toán sang PayPal
  paymentContext.setStrategy(new PayPalPayment());
  paymentContext.executeStrategy(amount);

  // Chuyển đổi chiến lược thanh toán sang Bitcoin
  paymentContext.setStrategy(new BitcoinPayment());
  paymentContext.executeStrategy(amount);
}
