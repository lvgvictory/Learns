// Đối tượng được quản lý bởi pool
class DatabaseConnection {
    private id: number;

    constructor(id: number) {
        this.id = id;
        console.log(`Creating a new database connection with id ${this.id}`);
    }

    public query(sql: string): void {
        console.log(`Connection ${this.id} executing query: ${sql}`);
    }

    public reset(): void {
        console.log(`Resetting connection ${this.id}`);
    }
}

// Object Pool
class ConnectionPool {
    private available: DatabaseConnection[] = [];
    private inUse: DatabaseConnection[] = [];
    private size: number;

    constructor(size: number) {
        this.size = size;
        this.initializePool();
    }

    private initializePool(): void {
        for (let i = 0; i < this.size; i++) {
            this.available.push(new DatabaseConnection(i));
        }
    }

    public getConnection(): DatabaseConnection | null {
        if (this.available.length === 0) {
            if (this.inUse.length < this.size) {
                const newConnection = new DatabaseConnection(this.size++);
                this.inUse.push(newConnection);
                return newConnection;
            }
            console.log("No connections available. Please try again later.");
            return null;
        }

        const connection = this.available.pop()!;
        this.inUse.push(connection);
        return connection;
    }

    public releaseConnection(connection: DatabaseConnection | null): void {
        if (!connection) {
            return;
        }

        const index = this.inUse.indexOf(connection);
        if (index !== -1) {
            this.inUse.splice(index, 1);
            connection.reset();
            this.available.push(connection);
        }
    }

    public getStatus(): string {
        return `Available connections: ${this.available.length}, In-use connections: ${this.inUse.length}`;
    }
}

// Client code
function clientCode6() {
    const pool = new ConnectionPool(3);

    console.log("Initial pool status:", pool.getStatus());

    const conn1 = pool.getConnection();
    const conn2 = pool.getConnection();

    if (conn1 && conn2) {
        conn1.query("SELECT * FROM users");
        conn2.query("INSERT INTO products VALUES (1, 'Book')");

        console.log("After getting two connections:", pool.getStatus());

        pool.releaseConnection(conn1);
        console.log("After releasing one connection:", pool.getStatus());

        const conn3 = pool.getConnection();
        const conn4 = pool.getConnection();

        if (conn3 && conn4) {
            conn3.query("UPDATE orders SET status = 'shipped'");
            conn4.query("DELETE FROM cart WHERE user_id = 5");
        }

        console.log("After getting two more connections:", pool.getStatus());

        pool.releaseConnection(conn2);
        pool.releaseConnection(conn3);
        pool.releaseConnection(conn4);

        console.log("Final pool status:", pool.getStatus());
    }
}

clientCode6();
