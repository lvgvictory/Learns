// Interface cho các phần tử có thể được "visit"
interface Shape {
  accept(visitor: Visitor): void;
}

// Các lớp cụ thể triển khai Shape
class Circle implements Shape {
  constructor(public radius: number) {}

  accept(visitor: Visitor): void {
    visitor.visitCircle(this);
  }
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}

  accept(visitor: Visitor): void {
    visitor.visitRectangle(this);
  }
}

// Interface Visitor
interface Visitor {
  visitCircle(circle: Circle): void;
  visitRectangle(rectangle: Rectangle): void;
}

// Các lớp Visitor cụ thể
class AreaCalculator implements Visitor {
  visitCircle(circle: Circle): void {
    const area = Math.PI * circle.radius ** 2;
    console.log(`Diện tích hình tròn: ${area.toFixed(2)}`);
  }

  visitRectangle(rectangle: Rectangle): void {
    const area = rectangle.width * rectangle.height;
    console.log(`Diện tích hình chữ nhật: ${area}`);
  }
}

class PerimeterCalculator implements Visitor {
  visitCircle(circle: Circle): void {
    const perimeter = 2 * Math.PI * circle.radius;
    console.log(`Chu vi hình tròn: ${perimeter.toFixed(2)}`);
  }

  visitRectangle(rectangle: Rectangle): void {
    const perimeter = 2 * (rectangle.width + rectangle.height);
    console.log(`Chu vi hình chữ nhật: ${perimeter}`);
  }
}

// Sử dụng
const shapes: Shape[] = [new Circle(5), new Rectangle(4, 6)];

const areaCalculator = new AreaCalculator();
const perimeterCalculator = new PerimeterCalculator();

shapes.forEach((shape) => {
  shape.accept(areaCalculator);
  shape.accept(perimeterCalculator);
  console.log("---");
});
