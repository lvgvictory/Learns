namespace cp {
  // Component interface
  interface Employee {
    getName(): string;
    getSalary(): number;
    showDetails(): void;
  }

  // Leaf class
  class Developer implements Employee {
    private name: string;
    private salary: number;

    constructor(name: string, salary: number) {
      this.name = name;
      this.salary = salary;
    }

    public getName(): string {
      return this.name;
    }

    public getSalary(): number {
      return this.salary;
    }

    public showDetails(): void {
      console.log(`Developer: ${this.getName()}, Salary: ${this.getSalary()}`);
    }
  }

  // Leaf class
  class Designer implements Employee {
    private name: string;
    private salary: number;

    constructor(name: string, salary: number) {
      this.name = name;
      this.salary = salary;
    }

    public getName(): string {
      return this.name;
    }

    public getSalary(): number {
      return this.salary;
    }

    public showDetails(): void {
      console.log(`Designer: ${this.getName()}, Salary: ${this.getSalary()}`);
    }
  }

  // Composite class
  class Manager implements Employee {
    private name: string;
    private salary: number;
    private employees: Employee[] = [];

    constructor(name: string, salary: number) {
      this.name = name;
      this.salary = salary;
    }

    public getName(): string {
      return this.name;
    }

    public getSalary(): number {
      return this.salary;
    }

    public addEmployee(employee: Employee): void {
      this.employees.push(employee);
    }

    public removeEmployee(employee: Employee): void {
      const index = this.employees.indexOf(employee);
      if (index > -1) {
        this.employees.splice(index, 1);
      }
    }

    public showDetails(): void {
      console.log(`Manager: ${this.getName()}, Salary: ${this.getSalary()}`);
      for (const employee of this.employees) {
        employee.showDetails();
      }
    }
  }

  // Sử dụng
  const dev1 = new Developer("John Doe", 50000);
  const dev2 = new Developer("Jane Doe", 55000);
  const designer1 = new Designer("Emily Smith", 45000);

  const manager = new Manager("Robert Brown", 80000);
  manager.addEmployee(dev1);
  manager.addEmployee(dev2);
  manager.addEmployee(designer1);

  manager.showDetails();
  // Output:
  // Manager: Robert Brown, Salary: 80000
  // Developer: John Doe, Salary: 50000
  // Developer: Jane Doe, Salary: 55000
  // Designer: Emily Smith, Salary: 45000
}
