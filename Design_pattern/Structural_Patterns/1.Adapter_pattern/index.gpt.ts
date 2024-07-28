namespace ap {
  // Giao diện cũ
  class OldSystem {
    public oldRequest(): string {
      return "Old system request";
    }
  }

  // Giao diện mới mà chúng ta muốn tích hợp
  interface NewSystem {
    request(): string;
  }

  // Adapter để tích hợp OldSystem vào NewSystem
  class Adapter implements NewSystem {
    private oldSystem: OldSystem;

    constructor(oldSystem: OldSystem) {
      this.oldSystem = oldSystem;
    }

    public request(): string {
      return this.oldSystem.oldRequest();
    }
  }

  // Sử dụng
  const oldSystem = new OldSystem();
  const adapter = new Adapter(oldSystem);

  console.log(adapter.request()); // Output: "Old system request"
}
