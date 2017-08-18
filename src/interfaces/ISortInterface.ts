/**
 * Interface to handle a comparison-based sorting
 */
export interface ISortInterface<T>
{
    /**
     * Comparison tuple
     * @returns A number 1-, 0 or 1 that indicates whether the current object is smaller, equal or bigger than the other object
     */
    (value1: T, value2: T): number;
}

export default ISortInterface