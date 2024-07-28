namespace bsad {
  class Memento {
    private state: string;

    constructor(state: string) {
      this.state = state;
    }

    public getState(): string {
      return this.state;
    }
  }

  class Originator {
    private state!: string;

    public setState(state: string): void {
      console.log(`Originator: Setting state to ${state}`);
      this.state = state;
    }

    public saveStateToMemento(): Memento {
      console.log("Originator: Saving to Memento.");
      return new Memento(this.state);
    }

    public getStateFromMemento(memento: Memento): void {
      this.state = memento.getState();
      console.log(
        `Originator: State after restoring from Memento: ${this.state}`
      );
    }
  }

  class Caretaker {
    private mementoList: Memento[] = [];

    public add(memento: Memento): void {
      this.mementoList.push(memento);
    }

    public get(index: number): Memento {
      return this.mementoList[index];
    }
  }

  const originator = new Originator();
  const caretaker = new Caretaker();

  originator.setState("State1");
  originator.setState("State2");
  caretaker.add(originator.saveStateToMemento());

  originator.setState("State3");
  caretaker.add(originator.saveStateToMemento());

  originator.setState("State4");

  console.log("Current State: " + originator["state"]);
  originator.getStateFromMemento(caretaker.get(0));
  console.log("First saved State: " + originator["state"]);
  originator.getStateFromMemento(caretaker.get(1));
  console.log("Second saved State: " + originator["state"]);
}
