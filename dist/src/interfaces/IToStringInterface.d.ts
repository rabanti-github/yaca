/**
 * Interface to override the default toString method (to generate hash codes of a dictionary)
 */
export interface IToStringInterface<K> {
    /**
     * Function delegate to define a hash code
     */
    (key: K): string;
}
export default IToStringInterface;
