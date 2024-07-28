namespace dp {
  // Component interface
  interface Beverage {
    getDescription(): string;
    cost(): number;
  }

  // Concrete Component
  class Coffee implements Beverage {
    public getDescription(): string {
      return "Coffee";
    }

    public cost(): number {
      return 5;
    }
  }

  // Concrete Component
  class Tea implements Beverage {
    public getDescription(): string {
      return "Tea";
    }

    public cost(): number {
      return 3;
    }
  }

  // Decorator abstract class
  abstract class BeverageDecorator implements Beverage {
    protected beverage: Beverage;

    constructor(beverage: Beverage) {
      this.beverage = beverage;
    }

    public getDescription(): string {
      return this.beverage.getDescription();
    }

    public cost(): number {
      return this.beverage.cost();
    }
  }

  // Concrete Decorator
  class MilkDecorator extends BeverageDecorator {
    constructor(beverage: Beverage) {
      super(beverage);
    }

    public getDescription(): string {
      return `${this.beverage.getDescription()}, Milk`;
    }

    public cost(): number {
      return this.beverage.cost() + 1;
    }
  }

  // Concrete Decorator
  class SugarDecorator extends BeverageDecorator {
    constructor(beverage: Beverage) {
      super(beverage);
    }

    public getDescription(): string {
      return `${this.beverage.getDescription()}, Sugar`;
    }

    public cost(): number {
      return this.beverage.cost() + 0.5;
    }
  }

  // Sử dụng
  const coffee = new Coffee();
  console.log(`${coffee.getDescription()} costs $${coffee.cost()}`); // Output: Coffee costs $5

  const milkCoffee = new MilkDecorator(coffee);
  console.log(`${milkCoffee.getDescription()} costs $${milkCoffee.cost()}`); // Output: Coffee, Milk costs $6

  const sugarMilkCoffee = new SugarDecorator(milkCoffee);
  console.log(
    `${sugarMilkCoffee.getDescription()} costs $${sugarMilkCoffee.cost()}`
  ); // Output: Coffee, Milk, Sugar costs $6.5
}
