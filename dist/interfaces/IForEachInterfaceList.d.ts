/**
 * Interface to handle a forEach loop
 */
export interface IForEachInterface<T> {
    /**
     * Callback function
     */
    (callback: T): void;
}
export default IForEachInterface;
