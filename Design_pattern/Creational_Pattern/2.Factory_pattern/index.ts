// Định nghĩa interface cho sản phẩm
interface Vehicle {
    getName(): string;
    getNumberOfWheels(): number;
}

// Các lớp cụ thể implement interface Vehicle
class Car implements Vehicle {
    getName() {
        return 'Car';
    }

    getNumberOfWheels() {
        return 4;
    }
}

class Motorcycle implements Vehicle {
    getName() {
        return 'Motorcycle';
    }

    getNumberOfWheels() {
        return 2;
    }
}

class Truck implements Vehicle {
    getName() {
        return 'Truck';
    }

    getNumberOfWheels() {
        return 18;
    }
}

// Factory method
class VehicleFactory {
    public static createVehicle(type: string): Vehicle {
        switch (type) {
            case 'car':
                return new Car();
            case 'motorcycle':
                return new Motorcycle();
            case 'truck':
                return new Truck();
            default:
                throw new Error('Invalid vehicle type');
        }
    }
}

function clientCode(vehicleType: string) {
    const vehicle = VehicleFactory.createVehicle(vehicleType);
    console.log(`Created a ${vehicle.getName()} with ${vehicle.getNumberOfWheels()} wheels.`);
}

// Sử dụng
clientCode("car");
clientCode("motorcycle");
clientCode("truck");