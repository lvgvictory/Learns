namespace bp {
  // Implementor interface
  interface DrawingAPI {
    drawCircle(x: number, y: number, radius: number): void;
  }

  // Concrete Implementor 1
  class DrawingAPI1 implements DrawingAPI {
    public drawCircle(x: number, y: number, radius: number): void {
      console.log(
        `DrawingAPI1: Drawing circle at (${x}, ${y}) with radius ${radius}`
      );
    }
  }

  // Concrete Implementor 2
  class DrawingAPI2 implements DrawingAPI {
    public drawCircle(x: number, y: number, radius: number): void {
      console.log(
        `DrawingAPI2: Drawing circle at (${x}, ${y}) with radius ${radius}`
      );
    }
  }

  // Abstraction
  abstract class Shape {
    protected drawingAPI: DrawingAPI;

    constructor(drawingAPI: DrawingAPI) {
      this.drawingAPI = drawingAPI;
    }

    public abstract draw(): void;
    public abstract resizeByPercentage(pct: number): void;
  }

  // Refined Abstraction
  class CircleShape extends Shape {
    private x: number;
    private y: number;
    private radius: number;

    constructor(x: number, y: number, radius: number, drawingAPI: DrawingAPI) {
      super(drawingAPI);
      this.x = x;
      this.y = y;
      this.radius = radius;
    }

    public draw(): void {
      this.drawingAPI.drawCircle(this.x, this.y, this.radius);
    }

    public resizeByPercentage(pct: number): void {
      this.radius *= 1 + pct / 100;
    }
  }

  // Sử dụng
  const circle1 = new CircleShape(1, 2, 3, new DrawingAPI1());
  const circle2 = new CircleShape(5, 7, 11, new DrawingAPI2());

  circle1.draw(); // Output: DrawingAPI1: Drawing circle at (1, 2) with radius 3
  circle2.draw(); // Output: DrawingAPI2: Drawing circle at (5, 7) with radius 11

  circle1.resizeByPercentage(50);
  circle1.draw(); // Output: DrawingAPI1: Drawing circle at (1, 2) with radius 4.5
}
