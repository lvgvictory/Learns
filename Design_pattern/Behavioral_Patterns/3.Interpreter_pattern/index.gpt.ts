namespace gpt {
  // 1. Định nghĩa ngữ pháp
  interface Expression {
    interpret(context: Map<string, number>): number;
  }

  // 2. Các biểu thức cụ thể
  class NumberExpression implements Expression {
    private value: number;

    constructor(value: number) {
      this.value = value;
    }

    interpret(context: Map<string, number>): number {
        console.log(111, context)
      return this.value;
    }
  }

  class AddExpression implements Expression {
    private leftExpression: Expression;
    private rightExpression: Expression;

    constructor(leftExpression: Expression, rightExpression: Expression) {
      this.leftExpression = leftExpression;
      this.rightExpression = rightExpression;
    }

    interpret(context: Map<string, number>): number {
      return (
        this.leftExpression.interpret(context) +
        this.rightExpression.interpret(context)
      );
    }
  }

  class SubtractExpression implements Expression {
    private leftExpression: Expression;
    private rightExpression: Expression;

    constructor(leftExpression: Expression, rightExpression: Expression) {
      this.leftExpression = leftExpression;
      this.rightExpression = rightExpression;
    }

    interpret(context: Map<string, number>): number {
      return (
        this.leftExpression.interpret(context) -
        this.rightExpression.interpret(context)
      );
    }
  }

  // 3. Sử dụng ngữ cảnh
  let context = new Map<string, number>();

  // Biểu thức: (10 + 20) - 5
  let expression: Expression = new SubtractExpression(
    new AddExpression(new NumberExpression(10), new NumberExpression(20)),
    new NumberExpression(5)
  );

  console.log(`Kết quả: ${expression.interpret(context)}`); // Kết quả: 25
}
