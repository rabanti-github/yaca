import IForEachInterface from './IForEachInterfaceDictionary';
import IToStringInterface from './IToStringInterface';

/**
 * Interface for Dictionaries (Delegating further interfaces)
 */
export interface IDictionary<K,V>
{
    /**
     * Variant of the add function to add a value with a user-defined toString function 
     */
    add(key: K, value: V, toStringFunction:IToStringInterface<V>);

}