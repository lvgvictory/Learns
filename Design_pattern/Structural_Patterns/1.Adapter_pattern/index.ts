// Giao diện mục tiêu mà client sẽ sử dụng
interface Target {
  request(): string;
}

// Lớp Adaptee có giao diện không tương thích
class Adaptee {
  specificRequest(): string {
    return "Adaptee's specific request";
  }
}

// Lớp Adapter triển khai giao diện Target và bao bọc một đối tượng Adaptee
class Adapter implements Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  request(): string {
    const result = this.adaptee.specificRequest();
    return `Adapter: (TRANSLATED) ${result}`;
  }
}

// Sử dụng
const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);

console.log(adapter.request());
