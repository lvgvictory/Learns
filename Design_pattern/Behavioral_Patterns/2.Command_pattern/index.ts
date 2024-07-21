// Command interface
interface Command1 {
    execute(): void;
}

// Concrete Command classes
class LightOnCommand1 implements Command1 {
    private light: Light1;

    constructor(light: Light1) {
        this.light = light;
    }

    execute(): void {
        this.light.turnOn();
    }
}

class LightOffCommand1 implements Command1 {
    private light: Light1;

    constructor(light: Light1) {
        this.light = light;
    }

    execute(): void {
        this.light.turnOff();
    }
}

// Receiver
class Light1 {
    turnOn(): void {
        console.log("Đèn bật");
    }

    turnOff(): void {
        console.log("Đèn tắt");
    }
}

// Invoker
class RemoteControl1 {
    private command: Command1 = { execute: () => {} };

    setCommand(command: Command1): void {
        this.command = command;
    }

    pressButton(): void {
        this.command.execute();
    }
}

// Client code
const light1 = new Light1();
const lightOn1 = new LightOnCommand1(light1);
const lightOff1 = new LightOffCommand1(light1);

const remote1 = new RemoteControl1();

remote1.setCommand(lightOn1);
remote1.pressButton(); // Output: Đèn bật

remote1.setCommand(lightOff1);
remote1.pressButton(); // Output: Đèn tắt