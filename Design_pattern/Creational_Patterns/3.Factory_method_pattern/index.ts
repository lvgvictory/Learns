namespace factoryMethodPattern {
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

// Các lớp Creator cụ thể
class ConcreteCreator1 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

// Client code
function clientCode1(creator: Creator) {
    console.log(`Client: I'm not aware of the creator's class, but it still works.\n${creator.someOperation()}`);
}


// Sử dụng
console.log("App: Launched with ConcreteCreator1.");
clientCode1(new ConcreteCreator1());
console.log("");

console.log("App: Launched with ConcreteCreator2.");
clientCode1(new ConcreteCreator2());
}