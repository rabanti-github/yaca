/// <reference types="node" />
/**
 * Class representing an iterator item
 */
export declare class IteratorItem<T> implements IteratorResult<T> {
    /**
     * If true, the last item of the iterator is reached
     */
    isLastEntry: boolean;
    /**
     * The value of the iterator item
     */
    value: T;
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
}
