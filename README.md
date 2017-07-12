# YACA
Yet Another Collection Approach
----

YACA is another approach to introduce Collections to TypeScript / JavaScript like known in Java, C# or other object-oriented programming languages. There are other approaches, but sometimes, small things regarding the convenience are missing.

YACA contains at the moment only <b>List&lt;T&gt;</b> as collection type. Further types (e.g. Dictionary or Stack) are planned.

## Installation
```bash
npm install -S yaca
```

## Usage (List<T>)
```ts
import {List} from 'yaca';

// Default constructor
let numberList: List<number> = new List<number>();

// Constructor with initial value
var stringList: List<string> = new List<string>("initial value");

// Constructor with array as initial value
let booelanList: List<boolean> = new List<boolean>([true, false, true, true]);

// Usage of more complex types
var otherList: List<SomeType> = new List<SomeType>();

numberList.add(22);
numberList.addRange([23,24,25]);
numberList.clear();
```

## Constructors
The type <b>T</b> is the generic type defined in the constructor (e.g. number, boolean etc.)

| Name & Arguments | Description |
|:---------|:------------|
| <b>List&lt;T&gt;()</b> | Default constructor |
| <b>List&lt;T&gt;(T)</b> | Constructor with one initial value |
| <b>List&lt;T&gt;(T[])</b> | Constructor with an array of Type T as initial values |
| <b>List&lt;T&gt;(List&lt;T&gt;)</b> | Constructor with a List of Type T as initial values |

## Properties

| Name | Type | Description |
|:---------|:-----|:------------|
| <b>length</b> | number | Gets the length of the list (read-only) |

## Methods
The type <b>T</b> is the generic type defined in the constructor (e.g. number, boolean etc.)

| Name & Arguments | Return Type | Description |
|:---------|:-----|:------------|
| <b>add()</b> | void | Adds an element at the end of the list |
| <b>addRange(T[])</b> | void | Adds an array of the type T at the end of the list |
| <b>addRange(List&lt;T&gt;)</b> | void | Adds a List of type T at the end of the list |
| <b>clear()</b> | void | Removes all elements from the list |
| <b>contains(T)</b> | boolean | Checks whether the list contains the specified value |
| <b>copyToArray()</b> | T[] | Copies the whole list into an array of type T |
| <b>copyToArray(number)</b> | T[] | Copies the list into an array of type T, beginning from the passed start index of the list |
| <b>copyToArray(number, number)</b> | T[] | Copies the list into an array of type T, as range between the passed start and end index of the list |
| <b>dequeue()</b> | T | Removes the top element of the list and returns its value (end index). Undefined will be returned if the list is empty |
| <b>distinct()</b> | void | Removes all duplicates of values in the list. All duplicates after the first occurrence of each value will be removed |
| <b>enqueue(T)</b> | void | Inserts a new value at the defined index position. All values above (index +1) will be shifted to the next higher index. The last item of the list will be shifted to a new value |
| <b>forEach(<i>callback</i>)</b> | void | Implementation of a forEach loop. The callback function gets the values |
| <b>get()</b> | T | Gets the value of the List at the specified index position |
| <b>getRange()</b> | List&lt;T&gt; | Copies the whole list into a new list of type T |
| <b>getRange(number)</b> | List&lt;T&gt; | Copies the list into a new list of type T, beginning from the passed start index of the original list |
| <b>getRange(number, number)</b> | List&lt;T&gt; | Copies the list into a new list of type T, as range between the passed start and end index of the original list |
| <b>indexOf(T)</b> | number | Gets the index of the first occurrence of the passed value |
| <b>indicesOf(T)</b> | number[] | Gets an array of the indices of all occurrences of the passed value |
| <b>indicesOfAsList(T)</b> | List&lt;T&gt; | Gets a list of the indices of all occurrences of the passed value |
| <b>insertAtIndex(number, T)</b> | void | Inserts a new value at the defined index position. All values above (index +1) will be shifted to the next higher index. The last item of the list will be shifted to a new value |
| <b>lastIndexOf(T)</b> | number | Gets the index of the last occurrence of the passed value |
| <b>next(any?)</b> | IteratorResult | Method to get the next value of an iterator. If the last item of the list is reached, the returned object indicates that the iterations are finished. Afterwards, the method starts again at index position 0. Calling of the forEach() method will also reset the position to 0. |
| <b>pop()</b> | T | Removes the top element of the list and returns its value (end position / last element). undefined will be returned if the list is empty |
| <b>push(T)</b> | void | Inserts a new value at the top position of the list (end position / last element). This method is synonymous with add() |
| <b>remove(T)</b> | boolean | Removes the passed value at the first occurrence in the list. Returns true if an element was removed |
| <b>removeAll(T)</b> | boolean | Removes the passed value at all positions in the List. Returns true if an element was removed |
| <b>removeAt(T)</b> | void | Removes the value at the defined index. All values above will be shifted one index position down (index - 1) |
| <b>removeAtIndices(number[])</b> | void | Removes all values at the defined indices. All values above a removes item will be shifted one index position down (index - 1) |
| <b>removeAtIndices(List&lt;number&gt;)</b> | void | Removes all values at the defined indices. All values above a removes item will be shifted one index position down (index - 1) |
| <b>remove(T)</b> | boolean | Removes the passed value at the first occurrence in the list |
| <b>removeAll(T)</b> | boolean | Removes the passed value at all positions in the list |
| <b>removeAt(number)</b> | void | Removes the value at the defined index. All values above will be shifted one index position down (index - 1) |
| <b>removeAtIndices(number[])</b> | void | Removes all values at the defined indices. All values above a removes item will be shifted one index position down (index - 1) |
<b>removeAtIndices(List&lt;number&gt;)</b> | void | Removes all values at the defined indices. All values above a removes item will be shifted one index position down (index - 1) |
| <b>reverse()</b> | void | Inverts the list |
| <b>set(number, T)</b> | void | Updates a value of the list at the specified index position |
| <b>sort(<i>CompareFunction</i>)</b> | void | Sorts the list according to the passed comparing function. The function has to compare two values of the type T. If value 1 is smaller than value 2, -1 has to be returned. If value 1 is bigger than value 2, 1 has to be returned. If both values are equal, 0 has to be returned. |
| <b>swapvalues(number, number)</b> | void | Swaps the values at the two defined index positions in the list |


