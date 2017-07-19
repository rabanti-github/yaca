/**
 * Class for test purpose. The class contains several objects and can be used to test operations on complex / custom data types
 */
export class TestClass
{
    private static counter: number = 0;
    public value1: string;
    public value2: number;
    public value3: boolean[];
    public value4: Date;

    /**
     * Default constructor
     */
    constructor()
    {

    }

    /**
     * Creates a randomized instance of the class
     */
    public static createRandomObject() : TestClass
    {
        let o: TestClass = new TestClass();
        o.value4 = new Date();
        o.value1 = o.value4.toDateString() + "_" + TestClass.counter.toString();
        o.value2 = o.value4.getMilliseconds() + TestClass.counter;
        let rnd: number;
        o.value3 = new Array(5);
        for (let i: number = 0; i < 5; i++)
        {
            rnd = Math.random();
            if (rnd > 0.5) {o.value3[i] = true;}
            else {o.value3[i] = false;}
        }
        TestClass.counter++;
        return o; 
    }
}