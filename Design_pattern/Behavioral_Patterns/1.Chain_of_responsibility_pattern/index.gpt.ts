interface Handler1 {
    setNext(handler: Handler1): Handler1;
    handle(request: string): string | null;
}

abstract class AbstractHandler1 implements Handler1 {
    private nextHandler: Handler1 | null = null;
  
    public setNext(handler: Handler1): Handler1 {
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

class MonkeyHandler extends AbstractHandler1 {
    public handle(request: string): string | null {
      if (request === 'Banana') {
        return `Monkey: I'll eat the ${request}.`;
      }
      return super.handle(request);
    }
}
  
class SquirrelHandler extends AbstractHandler1 {
    public handle(request: string): string | null {
      if (request === 'Nut') {
        return `Squirrel: I'll eat the ${request}.`;
      }
      return super.handle(request);
    }
}
  
class DogHandler extends AbstractHandler1 {
    public handle(request: string): string | null {
      if (request === 'MeatBall') {
        return `Dog: I'll eat the ${request}.`;
      }
      return super.handle(request);
    }
}
  
const monkey = new MonkeyHandler();
const squirrel1 = new SquirrelHandler();
const dog1 = new DogHandler();

monkey.setNext(squirrel1).setNext(dog1);

const foods = ['Nut', 'Banana', 'Cup of coffee'];

for (const food of foods) {
  console.log(`Client: Who wants a ${food}?`);

  const result = monkey.handle(food);
  if (result) {
    console.log(`  ${result}`);
  } else {
    console.log(`  ${food} was left untouched.`);
  }
}

