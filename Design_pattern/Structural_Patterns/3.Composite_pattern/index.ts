// Component interface
interface Component {
  operation(): string;
  add(component: Component): void;
  remove(component: Component): void;
  getChild(index: number): Component;
}

// Leaf class
class Leaf implements Component {
  constructor(private name: string) {}

  operation(): string {
    return `Leaf ${this.name}`;
  }

  add(component: Component): void {
    // Do nothing as a leaf cannot have children
  }

  remove(component: Component): void {
    // Do nothing as a leaf cannot have children to remove
  }

  getChild(index: number): Component {
    console.log("Leaf has no children");
    throw new Error("Leaf has no children");
  }
}

// Composite class
class Composite implements Component {
  private children: Component[] = [];

  constructor(private name: string) {}

  operation(): string {
    const results = [
      `Branch ${this.name}`,
      ...this.children.map((child) => child.operation()),
    ];
    return `${results.join(" + ")}`;
  }

  add(component: Component): void {
    this.children.push(component);
  }

  remove(component: Component): void {
    const index = this.children.indexOf(component);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

  getChild(index: number): Component {
    if (index < 0 || index >= this.children.length) {
      throw new Error("Invalid index");
    }
    return this.children[index];
  }
}

// Sử dụng
const tree = new Composite("Root");
const branch1 = new Composite("Branch 1");
const branch2 = new Composite("Branch 2");
const leaf1 = new Leaf("Leaf 1");
const leaf2 = new Leaf("Leaf 2");
const leaf3 = new Leaf("Leaf 3");

tree.add(branch1);
tree.add(branch2);
branch1.add(leaf1);
branch1.add(leaf2);
branch2.add(leaf3);

console.log(tree.operation());
