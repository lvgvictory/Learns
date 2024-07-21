interface Command {
    execute(): void;
}

class LightOnCommand implements Command {
    private light: Light;
  
    constructor(light: Light) {
      this.light = light;
    }
  
    public execute(): void {
      this.light.on();
    }
  }
  
class LightOffCommand implements Command {
    private light: Light;
  
    constructor(light: Light) {
      this.light = light;
    }
  
    public execute(): void {
      this.light.off();
    }
}

class Light {
    public on(): void {
      console.log('The light is on');
    }
  
    public off(): void {
      console.log('The light is off');
    }
}

class RemoteControl {
    // private command: Command = {
    //     execute: () => {
    //       console.log("No command assigned.");
    //     }
    //   };
    
    // private command!: Command;
    private command?: Command;
  
    public setCommand(command: Command): void {
      this.command = command;
    }
  
    public pressButton(): void {
        if (this.command) {
          this.command.execute();
        } else {
          console.log("No command assigned.");
        }
    }
}

// Tạo đối tượng receiver
const livingRoomLight = new Light();

// Tạo các đối tượng command và liên kết chúng với receiver
const lightOn = new LightOnCommand(livingRoomLight);
const lightOff = new LightOffCommand(livingRoomLight);

// Tạo đối tượng invoker và liên kết nó với các command cụ thể
const remote = new RemoteControl();
remote.setCommand(lightOn);
remote.pressButton();  // Output: The light is on

remote.setCommand(lightOff);
remote.pressButton();  // Output: The light is off  
  