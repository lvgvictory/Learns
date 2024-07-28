// Flyweight interface
interface Shape {
  draw(x: number, y: number): void;
}

// Concrete Flyweight
class Circle implements Shape {
  private color: string;
  private radius: number;

  constructor(color: string) {
    this.color = color;
    this.radius = 5; // Giả sử bán kính cố định
  }

  public draw(x: number, y: number): void {
    console.log(
      `Drawing a ${this.color} circle at (${x}, ${y}) with radius ${this.radius}`
    );
  }
}

// Flyweight Factory
class ShapeFactory {
  private static circles: { [color: string]: Circle } = {};

  public static getCircle(color: string): Circle {
    if (!(color in this.circles)) {
      this.circles[color] = new Circle(color);
    }
    return this.circles[color];
  }

  public static getCircleCount(): number {
    return Object.keys(this.circles).length;
  }
}

// Client code
class Canvas {
  private circles: { x: number; y: number; shape: Shape }[] = [];

  public addCircle(x: number, y: number, color: string): void {
    const circle = ShapeFactory.getCircle(color);
    this.circles.push({ x, y, shape: circle });
  }

  public draw(): void {
    this.circles.forEach((circle) => {
      circle.shape.draw(circle.x, circle.y);
    });
  }
}

// Sử dụng
const canvas = new Canvas();

canvas.addCircle(1, 2, "Red");
canvas.addCircle(3, 4, "Blue");
canvas.addCircle(5, 6, "Red");
canvas.addCircle(7, 8, "Green");
canvas.addCircle(9, 10, "Blue");

canvas.draw();

console.log(`Total circles created: ${ShapeFactory.getCircleCount()}`);
