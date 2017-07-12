/**
 * Interface to handle a comparison-based sorting
 */
export interface ISortInterface<T> {
    /**
     * Comparison tuple
     */
    (value1: T, value2: T): number;
}
export default ISortInterface;
