class DatabaseConnection123 {
    private static instance: DatabaseConnection123 | null = null;
    private host: string;
    private port: number;

    private constructor(host: string, port: number) {
        this.host = host;
        this.port = port;
    }

    public static getInstance(host: string, port: number): DatabaseConnection123 {
        if (!DatabaseConnection123.instance) {
            DatabaseConnection123.instance = new DatabaseConnection123(host, port);
        }

        return DatabaseConnection123.instance;
    }

    public connect(): void {
        console.log(`Connected to database at ${this.host}:${this.port}`);
    }

    public query(sql: string): void {
        console.log(`Executing query: ${sql}`);
    }
}

// Sử dụng Singleton
const connection1 = DatabaseConnection123.getInstance('localhost', 5432);
connection1.connect();
connection1.query('SELECT * FROM users');

const connection2 = DatabaseConnection123.getInstance('localhost', 5432);
console.log('Các kết nối có giống nhau không:', connection1 === connection2);