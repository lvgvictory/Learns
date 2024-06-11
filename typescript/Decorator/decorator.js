var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _this = this;
console.clear();
function Xn(x) {
    return function (target, propertyName, descriptor) {
        // console.log(target)
        // console.log(propertyName)
        var method = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log(args);
            return x * method.apply(void 0, args);
        };
    };
}
function Logger(target, propertyKey, descriptor) {
    console.log(111, target);
    console.log(222, propertyKey);
    console.log(333, descriptor);
}
var TestConteoller = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _sum_decorators;
    return _a = /** @class */ (function () {
            function TestConteoller() {
                __runInitializers(this, _instanceExtraInitializers);
            }
            TestConteoller.prototype.sum = function (a, b) {
                return a + b;
            };
            return TestConteoller;
        }()),
        (function () {
            _sum_decorators = [Xn(2)];
            __esDecorate(_a, null, _sum_decorators, { kind: "method", name: "sum", static: false, private: false, access: { has: function (obj) { return "sum" in obj; }, get: function (obj) { return obj.sum; } } }, null, _instanceExtraInitializers);
        })(),
        _a;
}();
var test = new TestConteoller();
console.log(test.sum(1, 2));
function Controller(prefix) {
    return function (classConstructor) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.age = 20;
                return _this;
            }
            // prefix:string = prefix
            class_1.prototype.test = function () {
                console.log(1222223);
            };
            return class_1;
        }(classConstructor));
    };
}
var TestConteoller = function () {
    var _classDecorators = [Controller('user')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TestConteoller = _classThis = /** @class */ (function () {
        function TestConteoller_1() {
            this.age = 10;
        }
        return TestConteoller_1;
    }());
    __setFunctionName(_classThis, "TestConteoller");
    (function () {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        TestConteoller = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestConteoller = _classThis;
}();
var test = new TestConteoller();
// console.log(test.sum(1, 2))
console.log(test.age);
