// Closures
// function test(): Function {
//   return function(a: number, b: number) {
//     return a + b;
//   }
// }
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
// console.log(test()(1, 2))
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
/**
 *
 * @param target // instance cua class do
 * @param propertyKey
 * @param descriptor
 */
function logger(target, propertyKey, descriptor) {
    console.log(111, target);
    console.log(222, propertyKey);
    console.log(333, descriptor);
}
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        console.log(value);
        console.log(111, target);
        console.log(222, propertyKey);
        console.log(333, descriptor);
        // descriptor.enumerable = value;
    };
}
var TestController = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _hello_decorators;
    return _a = /** @class */ (function () {
            function TestController() {
                __runInitializers(this, _instanceExtraInitializers);
            }
            TestController.prototype.hello = function () {
                // console.log("Hello method has been called.");
            };
            return TestController;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _hello_decorators = [enumerable(false)];
            __esDecorate(_a, null, _hello_decorators, { kind: "method", name: "hello", static: false, private: false, access: { has: function (obj) { return "hello" in obj; }, get: function (obj) { return obj.hello; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var test1 = new TestController;
test1.hello();
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
