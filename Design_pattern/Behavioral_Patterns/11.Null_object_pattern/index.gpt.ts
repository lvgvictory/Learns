namespace nop {
  interface Logger {
    log(message: string): void;
  }

  class ConsoleLogger implements Logger {
    log(message: string): void {
      console.log(message);
    }
  }

  class NullLogger implements Logger {
    log(message: string): void {
      // Không làm gì cả
    }
  }

  class Application {
    private logger: Logger;

    constructor(logger: Logger) {
      this.logger = logger;
    }

    run(): void {
      this.logger.log("Application is running...");
      // Các logic khác
    }
  }

  // Sử dụng ConsoleLogger
  const appWithLogger = new Application(new ConsoleLogger());
  appWithLogger.run();

  // Sử dụng NullLogger
  const appWithNullLogger = new Application(new NullLogger());
  appWithNullLogger.run();

  class LoggerFactory {
    static createLogger(isLoggingEnabled: boolean): Logger {
      if (isLoggingEnabled) {
        return new ConsoleLogger();
      } else {
        return new NullLogger();
      }
    }
  }

  // Sử dụng LoggerFactory để tạo logger
  const isLoggingEnabled = true; // hoặc false tùy thuộc vào cấu hình
  const logger = LoggerFactory.createLogger(isLoggingEnabled);
  const app = new Application(logger);
  app.run();
}
