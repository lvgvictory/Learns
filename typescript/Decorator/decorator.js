// Closures
function test() {
    return function (a, b) {
        return a + b;
    };
}
console.log(test()(1, 2));
// Decorators di kem voi class
// @AbortController('test') // class decorator
// class TestConteoller {
// @Post('') // Method decorator
// getUser(@Body() x) { // param decorator
// }
// @Test() // accessor decorator
// get user() {
// }
// }
// function Xn(x: number) {
//   return function(target: any, propertyName: string, descriptor: PropertyDescriptor) {
//     // console.log(target)
//     // console.log(propertyName)
//     const method = descriptor.value
//     descriptor.value = (...args: any[]) => {
//       console.log(args)
//       return x * method(...args)
//     }
//   }
// } 
// function Logger(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//   console.log(111, target)
//   console.log(222, propertyKey)
//   console.log(333, descriptor)
// }
// class TestConteoller {
//   @Xn(2)
//   sum(a: number, b: number) {
//     return a + b
//   }
// }
// const test = new TestConteoller()
// console.log(test.sum(1, 2))
// function Controller(prefix: string) {
//   return function(classConstructor: any) {
//     return class extends classConstructor {
//       age: number = 20
//       // prefix:string = prefix
//       test() {
//         console.log(1222223)
//       }
//     }
//   }
// }
// @Controller('user')
// class TestConteoller {
//   age: number = 10
// }
// const test = new TestConteoller()
// // console.log(test.sum(1, 2))
// console.log(test.age)
