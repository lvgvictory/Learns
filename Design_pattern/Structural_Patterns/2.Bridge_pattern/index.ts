// Giao diện Implementation định nghĩa các phương thức cho các lớp cụ thể
interface Implementation {
  operationImplementation(): string;
}

// Các lớp cụ thể triển khai Implementation
class ConcreteImplementationA implements Implementation {
  operationImplementation(): string {
    return "ConcreteImplementationA: Here's the result on platform A.";
  }
}

class ConcreteImplementationB implements Implementation {
  operationImplementation(): string {
    return "ConcreteImplementationB: Here's the result on platform B.";
  }
}

// Lớp Abstraction định nghĩa giao diện cho phần "control"
class Abstraction {
  protected implementation: Implementation;

  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }

  operation(): string {
    const result = this.implementation.operationImplementation();
    return `Abstraction: Base operation with:\n${result}`;
  }
}

// ExtendedAbstraction mở rộng giao diện được định nghĩa bởi Abstraction
class ExtendedAbstraction extends Abstraction {
  operation(): string {
    const result = this.implementation.operationImplementation();
    return `ExtendedAbstraction: Extended operation with:\n${result}`;
  }
}

// Sử dụng
function clientCode(abstraction: Abstraction) {
  console.log(abstraction.operation());
}

let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
clientCode(abstraction);

console.log("");

implementation = new ConcreteImplementationB();
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);
