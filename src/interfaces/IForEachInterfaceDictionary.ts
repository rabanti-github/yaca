/**
 * Interface to handle a forEach loop in dictionaries
 */
export interface IForEachInterface<K, V> {
  /**
   * Callback function
   */
  (callback: { key: K; value: V }): void;
}

export default IForEachInterface;
