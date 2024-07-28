// Interface định nghĩa hành vi chung
interface Logger {
  log(message: string): void;
}

// Triển khai cụ thể
class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

// Null object
class NullLogger implements Logger {
  log(message: string): void {
    // Không làm gì cả
  }
}

// Sử dụng
class Service {
  private logger: Logger;

  constructor(logger?: Logger) {
    this.logger = logger || new NullLogger();
  }

  doSomething(): void {
    // Luôn an toàn khi gọi log, không cần kiểm tra null
    this.logger.log("Đang thực hiện một số thao tác");
  }
}

// Ví dụ sử dụng
const serviceWithLogging = new Service(new ConsoleLogger());
serviceWithLogging.doSomething(); // In ra console

const serviceWithoutLogging = new Service();
serviceWithoutLogging.doSomething(); // Không in gì
