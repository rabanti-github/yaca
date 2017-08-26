import { Comparer } from '../../src/Comparer';
/**
 * Class for test purpose. The class contains several objects and can be used to test operations on complex / custom data types
 */
export class TestClass {
    /**
     * Default constructor
     */
    constructor() {
    }
    /**
     * Implementation of a compareTo function
     * @param other Other object to compare
     */
    compareTo(other) {
        return Comparer.compareNumbers(this.value2, other.value2);
    }
    /**
     * Creates a randomized instance of the class
     */
    static createRandomObject() {
        let o = new TestClass();
        o.value4 = new Date();
        o.value1 = o.value4.toDateString() + "_" + TestClass.counter.toString();
        o.value2 = o.value4.getMilliseconds() + TestClass.counter;
        let rnd;
        o.value3 = new Array(5);
        for (let i = 0; i < 5; i++) {
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
    }
}
TestClass.counter = 0;
//# sourceMappingURL=TestClass.js.map