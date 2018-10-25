/**
 * Interface to handle a forEach loop in lists
 */
export interface IForEachInterface<T> {
  /**
   * Callback function
   */
  (callback: T): void;
}

export default IForEachInterface;
