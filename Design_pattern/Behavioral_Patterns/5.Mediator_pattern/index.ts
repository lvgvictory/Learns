// Mediator Interface
interface ChatMediator {
    sendMessage(message: string, user: User): void;
    addUser(user: User): void;
}

// Concrete Mediator
class ChatRoom implements ChatMediator {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }

    sendMessage(message: string, sender: User): void {
        for (let user of this.users) {
            if (user !== sender) {
                user.receive(message);
            }
        }
    }
}

// Colleague
abstract class User {
    protected mediator: ChatMediator;
    protected name: string;

    constructor(mediator: ChatMediator, name: string) {
        this.mediator = mediator;
        this.name = name;
    }

    abstract send(message: string): void;
    abstract receive(message: string): void;
}

// Concrete Colleague
class ChatUser extends User {
    send(message: string): void {
        console.log(`${this.name} sends: ${message}`);
        this.mediator.sendMessage(message, this);
    }

    receive(message: string): void {
        console.log(`${this.name} receives: ${message}`);
    }
}

// Usage
const mediator = new ChatRoom();

const john = new ChatUser(mediator, "John");
const jane = new ChatUser(mediator, "Jane");
const bob = new ChatUser(mediator, "Bob");

mediator.addUser(john);
mediator.addUser(jane);
mediator.addUser(bob);

john.send("Hi everyone!");
jane.send("Hello John!");