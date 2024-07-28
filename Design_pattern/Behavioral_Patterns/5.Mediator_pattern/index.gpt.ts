namespace gpt {
    interface Mediator {
        notify(sender: object, event: string): void;
    }
    
    class Component1 {
        private mediator: Mediator;
    
        constructor(mediator: Mediator) {
            this.mediator = mediator;
        }
    
        public doA(): void {
            console.log('Component 1 does A.');
            this.mediator.notify(this, 'A');
        }
    
        public doB(): void {
            console.log('Component 1 does B.');
            this.mediator.notify(this, 'B');
        }
    }
    
    class Component2 {
        private mediator: Mediator;
    
        constructor(mediator: Mediator) {
            this.mediator = mediator;
        }
    
        public doC(): void {
            console.log('Component 2 does C.');
            this.mediator.notify(this, 'C');
        }
    
        public doD(): void {
            console.log('Component 2 does D.');
            this.mediator.notify(this, 'D');
        }
    }
    
    class ConcreteMediator implements Mediator {
        private component1!: Component1;
        private component2!: Component2;
    
        public setComponent1(c1: Component1): void {
            this.component1 = c1;
        }
    
        public setComponent2(c2: Component2): void {
            this.component2 = c2;
        }
    
        public notify(sender: object, event: string): void {
            if (event === 'A') {
                console.log('Mediator reacts on A and triggers following operations:');
                this.component2.doC();
            }
    
            if (event === 'D') {
                console.log('Mediator reacts on D and triggers following operations:');
                this.component1.doB();
            }
        }
    }
    
    const mediator = new ConcreteMediator();
    
    const c1 = new Component1(mediator);
    const c2 = new Component2(mediator);
    
    mediator.setComponent1(c1);
    mediator.setComponent2(c2);
    
    c1.doA();
    c2.doD();      
}

