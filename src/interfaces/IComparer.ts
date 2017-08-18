/**
 * Interface to implement a compareTo function in classes for sorting purpose (e.g. List<T>)
 */
export interface IComparer<T>
{
    /**
     * Compare function between two objects of the same type T: If this object is smaller than the other object, -1 has to be returned. If this object is bigger than the other objects, 1 has to be returned. If both objects are equal, 0 has to be returned.
     * @returns A number 1-, 0 or 1 that indicates whether the current object is smaller, equal or bigger than the other object
     */
    compareTo(other: T): number;
}

export default IComparer;