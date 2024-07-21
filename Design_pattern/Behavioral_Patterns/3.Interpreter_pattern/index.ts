// Abstract Expression
interface Expression {
    interpret(context: string): boolean;
}

// Terminal Expression
class TerminalExpression implements Expression {
    private data: string;

    constructor(data: string) {
        this.data = data;
    }

    interpret(context: string): boolean {
        return context.includes(this.data);
    }
}

// Non-terminal Expression
class OrExpression implements Expression {
    private expr1: Expression;
    private expr2: Expression;

    constructor(expr1: Expression, expr2: Expression) {
        this.expr1 = expr1;
        this.expr2 = expr2;
    }

    interpret(context: string): boolean {
        return this.expr1.interpret(context) || this.expr2.interpret(context);
    }
}

class AndExpression implements Expression {
    private expr1: Expression;
    private expr2: Expression;

    constructor(expr1: Expression, expr2: Expression) {
        this.expr1 = expr1;
        this.expr2 = expr2;
    }

    interpret(context: string): boolean {
        return this.expr1.interpret(context) && this.expr2.interpret(context);
    }
}

// Client code
const john = new TerminalExpression("John");
const married = new TerminalExpression("Married");
const isJohnMarried = new AndExpression(john, married);

console.log(isJohnMarried.interpret("John is married")); // true
console.log(isJohnMarried.interpret("John is single")); // false

const robert = new TerminalExpression("Robert");
const isJohnOrRobert = new OrExpression(john, robert);

console.log(isJohnOrRobert.interpret("John is here")); // true
console.log(isJohnOrRobert.interpret("Robert is here")); // true
console.log(isJohnOrRobert.interpret("Tom is here")); // false