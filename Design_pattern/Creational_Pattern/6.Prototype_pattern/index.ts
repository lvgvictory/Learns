// Prototype interface
interface Cloneable {
    clone(): Cloneable;
}

// Concrete Prototype
class Shape implements Cloneable {
    constructor(public x: number, public y: number, public color: string) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    public clone(): Shape {
        return new Shape(this.x, this.y, this.color);
    }

    public getInfo(): string {
        return `Shape at (${this.x}, ${this.y}) with color ${this.color}`;
    }
}

// More complex prototype
class Rectangle extends Shape {
    constructor(x: number, y: number, color: string, public width: number, public height: number) {
        super(x, y, color);
        this.width = width;
        this.height = height;
    }

    public clone(): Rectangle {
        return new Rectangle(this.x, this.y, this.color, this.width, this.height);
    }

    public getInfo(): string {
        return `Rectangle at (${this.x}, ${this.y}) with color ${this.color}, width ${this.width}, height ${this.height}`;
    }
}

// Client code
function clientCode5() {
    const originalShape = new Shape(10, 15, "Red");
    const clonedShape = originalShape.clone();

    console.log("Original shape:", originalShape.getInfo());
    console.log("Cloned shape:", clonedShape.getInfo());

    const originalRectangle = new Rectangle(5, 5, "Blue", 50, 100);
    const clonedRectangle = originalRectangle.clone();

    console.log("Original rectangle:", originalRectangle.getInfo());
    console.log("Cloned rectangle:", clonedRectangle.getInfo());

    // Demonstrating that clones are independent
    clonedRectangle.width = 75;
    clonedRectangle.height = 150;

    console.log("Modified cloned rectangle:", clonedRectangle.getInfo());
    console.log("Original rectangle (unchanged):", originalRectangle.getInfo());
}

clientCode5();
