abstract class CoffeeTemplate {
  // Phương thức template định nghĩa thuật toán
  makeCoffee(): void {
    this.boilWater();
    this.brewCoffeeGrinds();
    this.pourInCup();
    this.addCondiments();
  }

  // Các phương thức cố định
  protected boilWater(): void {
    console.log("Đang đun sôi nước");
  }

  protected pourInCup(): void {
    console.log("Đang rót vào cốc");
  }

  // Các phương thức abstract để lớp con ghi đè
  protected abstract brewCoffeeGrinds(): void;
  protected abstract addCondiments(): void;
}

class Espresso extends CoffeeTemplate {
  protected brewCoffeeGrinds(): void {
    console.log("Đang pha cà phê espresso");
  }

  protected addCondiments(): void {
    console.log("Thêm một chút đường");
  }
}

class Cappuccino extends CoffeeTemplate {
  protected brewCoffeeGrinds(): void {
    console.log("Đang pha cà phê cappuccino");
  }

  protected addCondiments(): void {
    console.log("Thêm sữa và bọt sữa");
  }
}

// Sử dụng
const espresso = new Espresso();
console.log("Đang pha Espresso:");
espresso.makeCoffee();

console.log("\nĐang pha Cappuccino:");
const cappuccino = new Cappuccino();
cappuccino.makeCoffee();
