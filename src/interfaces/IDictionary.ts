import IForEachInterface from './IForEachInterfaceDictionary';
import ISortInterface from './ISortInterface';

/**
 * Interface for Dictionaries (Delegating further interfaces)
 */
export interface IDictionary<K,V>
{
    /**
     * Interface to handle foeEach loops --> TODO
     */
   // forEach(callback:IForEachInterface<K, V>);

    /**
     * Interface to handle sorting --TODO
     */
   // sort(sortFunction:ISortInterface<K, V>);

}