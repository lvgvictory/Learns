// Abstract Factory là một mẫu thiết kế thuộc nhóm Creational Pattern, cho phép bạn tạo ra các họ đối tượng liên quan mà không cần chỉ định các lớp cụ thể của chúng. Abstract Factory cung cấp một interface để tạo ra các đối tượng trong một họ sản phẩm liên quan.
// Cách sử dụng Abstract Factory pattern:

// Định nghĩa interfaces cho mỗi sản phẩm riêng biệt trong họ sản phẩm.
// Tạo một interface Abstract Factory khai báo một tập các phương thức để tạo ra mỗi sản phẩm.
// Implement các Concrete Factory classes, mỗi class tương ứng với một biến thể cụ thể của sản phẩm.
// Trong code client, sử dụng chỉ interfaces của factory và sản phẩm.

// Abstract Products
interface Chair {
    hasLegs(): boolean;
    sitOn(): string;
}

interface Table {
    hasLegs(): boolean;
    putOn(): string;
}

// Concrete Products
class ModernChair implements Chair {
    hasLegs() {
        return true;
    }

    sitOn() {
        return 'Sitting on a modern chair';
    }
}

class VictorianChair implements Chair {
    hasLegs() {
        return true;
    }

    sitOn() {
        return 'Sitting on a victorian chair';
    }
}

class ModernTable implements Table {
    hasLegs() {
        return true;
    }

    putOn() {
        return 'Putting on a modern table';
    }
}

class VictorianTable implements Table {
    hasLegs() {
        return true;
    }

    putOn() {
        return 'Putting on a victorian table';
    }
}

// Abstract Factory
interface FurnitureFactory {
    createChair(): Chair;
    createTable(): Table;
}

// Concrete Factories
class ModernFurnitureFactory implements FurnitureFactory {
    createChair() {
        return new ModernChair();
    }

    createTable() {
        return new ModernTable();
    }
}

class VictorianFurnitureFactory implements FurnitureFactory {
    createChair() {
        return new VictorianChair();
    }

    createTable() {
        return new VictorianTable();
    }
}

// Client Code
function clientCode3(factory: FurnitureFactory) {
    const chair = factory.createChair();
    const table = factory.createTable();

    console.log(chair.sitOn());
    console.log(table.putOn());
}

// Usage
console.log("Client: Testing client code with Modern Furniture Factory:");
clientCode3(new ModernFurnitureFactory());

console.log("\nClient: Testing the same client code with Victorian Furniture Factory:");
clientCode3(new VictorianFurnitureFactory());
