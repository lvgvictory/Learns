// Giao diện Component định nghĩa các hoạt động mà cả ConcreteComponent và Decorator phải triển khai
interface Component {
  operation(): string;
}

// ConcreteComponent cung cấp triển khai mặc định của các hoạt động
class ConcreteComponent implements Component {
  public operation(): string {
    return "ConcreteComponent";
  }
}

// Decorator cơ sở tuân theo cùng giao diện như các component khác
abstract class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  public operation(): string {
    return this.component.operation();
  }
}

// Các Concrete Decorator gọi đối tượng được bọc và thêm hành vi mới của riêng chúng
class ConcreteDecoratorA extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

class ConcreteDecoratorB extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}

// Sử dụng
function clientCode(component: Component) {
  console.log(`RESULT: ${component.operation()}`);
}

const simple = new ConcreteComponent();
console.log("Client: I've got a simple component:");
clientCode(simple);
console.log("");

const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log("Client: Now I've got a decorated component:");
clientCode(decorator2);
