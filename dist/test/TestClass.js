"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class for test purpose. The class contains several objects and can be used to test operations on complex / custom data types
 */
var TestClass = (function () {
    /**
     * Default constructor
     */
    function TestClass() {
    }
    /**
     * Creates a randomized instance of the class
     */
    TestClass.createRandomObject = function () {
        var o = new TestClass();
        o.value4 = new Date();
        o.value1 = o.value4.toDateString() + "_" + TestClass.counter.toString();
        o.value2 = o.value4.getMilliseconds() + TestClass.counter;
        var rnd;
        o.value3 = new Array(5);
        for (var i = 0; i < 5; i++) {
            rnd = Math.random();
            if (rnd > 0.5) {
                o.value3[i] = true;
            }
            else {
                o.value3[i] = false;
            }
        }
        TestClass.counter++;
        return o;
    };
    TestClass.counter = 0;
    return TestClass;
}());
exports.TestClass = TestClass;
//# sourceMappingURL=TestClass.js.map