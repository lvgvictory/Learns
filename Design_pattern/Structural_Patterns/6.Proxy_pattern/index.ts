namespace ppi {
  // Interface chung cho cả RealSubject và Proxy
  interface Subject {
    request(): string;
  }

  // RealSubject là đối tượng thực mà Proxy đại diện
  class RealSubject implements Subject {
    public request(): string {
      return "RealSubject: Handling request.";
    }
  }

  // Proxy class
  class Proxy implements Subject {
    private realSubject: RealSubject | null = null;
    private cachedData: string | null = null;

    constructor(private accessToken: string) {}

    public request(): string {
      console.log("Proxy: Checking access before handling the request.");

      if (!this.checkAccess()) {
        return "Proxy: Access denied.";
      }

      if (this.cachedData === null) {
        if (this.realSubject === null) {
          console.log("Proxy: Creating a new RealSubject instance.");
          this.realSubject = new RealSubject();
        }

        console.log("Proxy: Executing request on RealSubject.");
        this.cachedData = this.realSubject.request();
      } else {
        console.log("Proxy: Returning cached data.");
      }

      this.logAccess();
      return this.cachedData;
    }

    private checkAccess(): boolean {
      // Giả lập kiểm tra quyền truy cập
      console.log("Proxy: Checking access rights.");
      return this.accessToken === "valid_token";
    }

    private logAccess(): void {
      const date = new Date().toISOString();
      console.log(`Proxy: Request was made at ${date}`);
    }
  }

  // Client code
  function clientCode(subject: Subject) {
    console.log(subject.request());
  }

  // Sử dụng
  console.log("Client: Executing with RealSubject:");
  const realSubject = new RealSubject();
  clientCode(realSubject);

  console.log("\nClient: Executing with Proxy (valid token):");
  const proxy = new Proxy("valid_token");
  clientCode(proxy);

  console.log("\nClient: Executing with Proxy again (using cache):");
  clientCode(proxy);

  console.log("\nClient: Executing with Proxy (invalid token):");
  const invalidProxy = new Proxy("invalid_token");
  clientCode(invalidProxy);
}
