// Bước 1: Định nghĩa Reusable Object Interface
interface DatabaseConnection1 {
    query(sql: string): void;
    close(): void;
}

// Bước 2: Tạo Concrete Reusable Object Class
class ConcreteDatabaseConnection1 implements DatabaseConnection1 {
    private id: number;

    constructor(id: number) {
        this.id = id;
        console.log(`Creating connection ${id}`);
    }
    public reset(): void {
        throw new Error("Method not implemented.");
    }

    query(sql: string): void {
        console.log(`Executing query on connection ${this.id}: ${sql}`);
    }

    close(): void {
        console.log(`Closing connection ${this.id}`);
    }
}

// Bước 3: Tạo Object Pool Class
class ConnectionPool1 {
    private availableConnections: DatabaseConnection1[] = [];
    private usedConnections: DatabaseConnection1[] = [];
    private maxConnections: number;
    private currentId: number = 0;

    constructor(maxConnections: number) {
        this.maxConnections = maxConnections;
    }

    acquireConnection(): DatabaseConnection1 {
        let connection11: DatabaseConnection1;

        if (this.availableConnections.length > 0) {
            connection11 = this.availableConnections.pop()!;
            this.usedConnections.push(connection11);
        } else if (this.usedConnections.length < this.maxConnections) {
            connection11 = new ConcreteDatabaseConnection1(this.currentId++);
            this.usedConnections.push(connection11);
        } else {
            throw new Error("No available connections");
        }

        return connection11;
    }

    releaseConnection(connection12: DatabaseConnection1): void {
        const index = this.usedConnections.indexOf(connection12);
        if (index !== -1) {
            this.usedConnections.splice(index, 1);
            this.availableConnections.push(connection12);
        }
    }
}

// Bước 4: Sử dụng Object Pool để quản lý các đối tượng
const pool = new ConnectionPool1(2);

try {
    const connection1 = pool.acquireConnection();
    connection1.query("SELECT * FROM users");

    const connection2 = pool.acquireConnection();
    connection2.query("SELECT * FROM products");

    pool.releaseConnection(connection1);

    const connection3 = pool.acquireConnection();
    connection3.query("SELECT * FROM orders");

    pool.releaseConnection(connection2);
    pool.releaseConnection(connection3);
} catch (error: any) {
    console.error(error.message);
}

