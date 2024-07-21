abstract class Handler {
    private nextHandler: Handler | null = null;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: string): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}

class ConcreteHandler1 extends Handler {
    public handle(request: string): string | null {
        if (request === "Request1") {
            return "Handler1: Xử lý Request1";
        }
        return super.handle(request);
    }
}

class ConcreteHandler2 extends Handler {
    public handle(request: string): string | null {
        if (request === "Request2") {
            return "Handler2: Xử lý Request2";
        }
        return super.handle(request);
    }
}

class ConcreteHandler3 extends Handler {
    public handle(request: string): string | null {
        if (request === "Request3") {
            return "Handler3: Xử lý Request3";
        }
        return super.handle(request);
    }
}

// Sử dụng
const handler1 = new ConcreteHandler1();
const handler2 = new ConcreteHandler2();
const handler3 = new ConcreteHandler3();

handler1.setNext(handler2).setNext(handler3);

console.log(handler1.handle("Request1"));
console.log(handler1.handle("Request2"));
console.log(handler1.handle("Request3"));
console.log(handler1.handle("Request4"));