namespace Fp {
  // Flyweight interface
  interface TreeType {
    name: string;
    color: string;
    texture: string;
    draw(x: number, y: number): void;
  }

  // Concrete Flyweight
  class TreeTypeImpl implements TreeType {
    constructor(
      public name: string,
      public color: string,
      public texture: string
    ) {}

    public draw(x: number, y: number): void {
      console.log(
        `Drawing a ${this.name} tree at (${x}, ${y}) with color ${this.color} and texture ${this.texture}`
      );
    }
  }

  // Flyweight Factory
  class TreeFactory {
    private static treeTypes: { [key: string]: TreeType } = {};

    public static getTreeType(
      name: string,
      color: string,
      texture: string
    ): TreeType {
      const key = `${name}_${color}_${texture}`;
      if (!this.treeTypes[key]) {
        this.treeTypes[key] = new TreeTypeImpl(name, color, texture);
      }
      return this.treeTypes[key];
    }
  }

  // Context class
  class Tree {
    constructor(public x: number, public y: number, public type: TreeType) {}

    public draw(): void {
      this.type.draw(this.x, this.y);
    }
  }

  // Client
  class Forest {
    private trees: Tree[] = [];

    public plantTree(
      x: number,
      y: number,
      name: string,
      color: string,
      texture: string
    ): void {
      const type = TreeFactory.getTreeType(name, color, texture);
      const tree = new Tree(x, y, type);
      this.trees.push(tree);
    }

    public draw(): void {
      for (const tree of this.trees) {
        tree.draw();
      }
    }
  }

  // Sử dụng
  const forest = new Forest();
  forest.plantTree(1, 2, "Oak", "Green", "Rough");
  forest.plantTree(3, 4, "Pine", "Green", "Smooth");
  forest.plantTree(5, 6, "Oak", "Green", "Rough"); // Sẽ dùng lại đối tượng TreeTypeImpl cho Oak

  forest.draw();
  // Output:
  // Drawing a Oak tree at (1, 2) with color Green and texture Rough
  // Drawing a Pine tree at (3, 4) with color Green and texture Smooth
  // Drawing a Oak tree at (5, 6) with color Green and texture Rough
}
