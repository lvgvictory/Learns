// Product
class House {
    private parts: string[] = [];

    public addPart(part: string): void {
        this.parts.push(part);
    }

    public listParts(): void {
        console.log(`House parts: ${this.parts.join(', ')}`);
    }
}

// Builder Interface
interface HouseBuilder {
    reset(): void;
    buildWalls(): void;
    buildDoors(): void;
    buildWindows(): void;
    buildRoof(): void;
    buildGarage(): void;
    getResult(): House;
}

// Concrete Builder
class ConcreteHouseBuilder implements HouseBuilder {
    private house!: House;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.house = new House();
    }

    public buildWalls(): void {
        this.house.addPart("Walls");
    }

    public buildDoors(): void {
        this.house.addPart("Doors");
    }

    public buildWindows(): void {
        this.house.addPart("Windows");
    }

    public buildRoof(): void {
        this.house.addPart("Roof");
    }

    public buildGarage(): void {
        this.house.addPart("Garage");
    }

    public getResult(): House {
        const result = this.house;
        this.reset();
        return result;
    }
}

// Director
class Director {
    private builder!: HouseBuilder;

    public setBuilder(builder: HouseBuilder): void {
        this.builder = builder;
    }

    public buildMinimalViableHouse(): void {
        this.builder.buildWalls();
        this.builder.buildDoors();
        this.builder.buildWindows();
        this.builder.buildRoof();
    }

    public buildFullFeaturedHouse(): void {
        this.builder.buildWalls();
        this.builder.buildDoors();
        this.builder.buildWindows();
        this.builder.buildRoof();
        this.builder.buildGarage();
    }
}

// Client Code
function clientCode4(director: Director) {
    const builder = new ConcreteHouseBuilder();
    director.setBuilder(builder);

    console.log("Standard basic house:");
    director.buildMinimalViableHouse();
    builder.getResult().listParts();

    console.log("Standard full featured house:");
    director.buildFullFeaturedHouse();
    builder.getResult().listParts();

    // Remember, the Builder pattern can be used without a Director class.
    console.log("Custom house:");
    builder.buildWalls();
    builder.buildRoof();
    builder.getResult().listParts();
}

const director = new Director();
clientCode4(director);
