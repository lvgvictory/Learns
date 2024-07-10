// Interface chung cho tất cả các sản phẩm
interface Product {
    operation(): string;
}

// Các lớp cụ thể implement interface Product
class ConcreteProduct1 implements Product {
    public operation(): string {
        return 'ConcreteProduct1';
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return 'ConcreteProduct2';
    }
}

// Factory method
abstract class Creator {
    public abstract factoryMethod(): Product;

    public someOperation(): string {
        const product = this.factoryMethod();
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}