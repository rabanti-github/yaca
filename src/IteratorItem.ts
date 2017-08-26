
/**
 * Class representing an iterator item
 */
export class IteratorItem<T> implements IteratorResult<T>
{
    // I N T E R F A C E   I M P L E M E N T A T I O N
    /**
     * If true, the last item of the iterator is reached
     */
    done: boolean;

    /**
     * The value of the iterator item
     */
    public value: T;

    /**
     * Default constructor with full parameters
     * @param value Value of the iterator item
     * @param finished If true, the last item of the iterator is reached
     */
    constructor(value: T, finished: boolean);
        /**
     * Constructor with value
     * @param value Value of the iterator item
     */
    constructor(value: T);
    /**
     * Default constructor
     */
    constructor();
    constructor(value?: T, finished?: boolean)
    {
        if (value !== undefined)
        {
            this.value = value;
        }
        if (finished !== undefined)
        {
            this.done = finished;
        }
        else
        {
            this.done = false;
        }
    }
}
