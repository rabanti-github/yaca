# YACA

**Y**et **A**nother **C**ollection **A**pproach

## Introduction

YACA is another approach to introduce Collections to TypeScript / JavaScript like known in Java, C# or other object-oriented programming languages. There are other approaches, but sometimes, small things regarding the convenience are missing.

[![Coverage Status](https://coveralls.io/repos/github/rabanti-github/yaca/badge.svg?branch=master)](https://coveralls.io/github/rabanti-github/yaca?branch=master)
![npm](https://img.shields.io/npm/v/yaca.svg?maxAge=86400)
![license](https://img.shields.io/github/license/rabanti-github/yaca.svg)

YACA contains at the moment **List&lt;T&gt;**, **Dictionary&lt;K,V&gt;** and **SortedDictionary&lt;K,V&gt;** as collection types. Further types (e.g. Stack) are planned.

## Important features

* Multiple add and remove functions like add, addRange, insertAtIndex, push or set
* Multiple check functions like contains, containsKey, containsValues or containsKeyAsList
* Multiple copy functions like copyToArray or getRange
* forEach method provided (returns KeyValuePair for Dictionaries)
* Build-in break and (optional) continue calls within forEach loops as control elements
* Native sorting of the types number, string, boolean and Date (in List class)
* Possibility of the implementation of a compareTo function in classes for sorting purpose (interface IComparer)
* Possibility to sort SortedDictionary by key or value, according to the default behavior, a defined compariosn method or an implementation of a compareTo function
* Provided static compareTo functions for the types number, string, boolean and Date (module Comparer)

See the **[Change Log](https://github.com/rabanti-github/yaca/blob/master/changelog.md)** for recent updates.

## Installation

```bash
npm install -S yaca
```

## List&lt;T&gt;

A list stores values similar to an array. In comparison to an array, several functions like copies of a range, clearing or sorting can be applied out of the box. Additionally, operations for stacks and queues are included.

### Supported functions

* add
* addRange
* break (used in forEach)
* clear
* contains
* continue (used in forEach)
* dequeue
* distinct
* enqueue
* forEach
* get
* getRange
* indexOf
* indicesOf
* indicesOfAsList
* insertAtIndices
* lastIndexOf
* next
* peek
* pop
* remove
* removeAll
* removeAt
* removeAtIndices
* reverse
* set
* sort
* swapValues

### Usage

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

numberList.sort();

numberList.forEach(element => {
            console.log(element);
            if (element === 2)
            {
                numberList.continue(); // Optional / syntactic call to skip this iteration
                return; // Mandatory! -> sufficient as continue call
            }
            if (element === 4)
            {
                numberList.break(); // Breaks the forEach loop immediately
                return; // Mandatory!
            }

        });

numberList.clear();
```

See  [The List documentation page](https://rabanti-github.github.io/yaca/classes/_src_list_.list.html) for further details:

* Constructors
* Properties
* Methods


## Dictionary&lt;K,V&gt;

A dictionary stores tuples of keys and an values. The type of both can be arbitrary. However, keys must be unique. Thus, a dictionary with boolean as keys allows only two tuples (true and false) in the Dictionary. If custom classes are used as keys, a valid toString function must be implemented in those classes or the function overrideHashFunction must be used in the Dictionary.

### Supported functions

* add
* addRange
* break (used in forEach)
* clear
* containsKey
* containsKeys
* containsValue
* containsValues
* continue (used in forEach)
* distinct
* forEach
* get
* getKeys
* getKeysAsList
* getKeysByValue
* getKeysByValueAsList
* getKeysByValues
* getKeysByValuesAsList
* getRange
* getRageByValue
* getValues
* getValuesAsList
* next
* overrideHashFunction
* remove
* removeByValue
* set
* swapValues

### Usage

```ts
import {Dictionary} from 'yaca';

// Default constructor
let dictionary: Dictionary<number, string> = new Dictionary<number, string>();

// Constructor with initial value
let dictionary2: Dictionary<number, string> = new Dictionary<number, string>([1,2,3],["one","two","three"]]);

// Constructor with custom function to override the hashing of the keys (defaul is toString)
let dictionary3: Dictionary<number, Date> = new Dictionary<number, Date>(MyUtils.DateHashingFunction);

// Usage of more complex types
var otherDictionary: Dictionary<Date, SomeType> = new Dictionary<Date, SomeType>();

dictionary.add(22, "twenty two");

let value:string = dictionary2.get(2);

dictionary2.forEach(item => {
            console.log("key:" + item.key + " -> value:" + item.value);

            if (item.value === "two")
            {
                dictionary2.continue(); // Optional / syntactic call to skip this iteration
                return; // Mandatory! -> sufficient as continue call
            }
            if (item.key === 3)
            {
                dictionary2.break(); // Breaks the forEach loop immediately
                return; // Mandatory!
            }

        });

dictionary3.clear();
```

See  [The Dictionary documentation page](https://rabanti-github.github.io/yaca/classes/_src_dictionary_.dictionary.html) for further details:

* Constructors
* Properties
* Methods

## SortedDictionary&lt;K,V&gt;

A sorted dictionary has the same behavior properties and functions like a standard dictionary. Additionally, there are many functions regarding the indices of the key value tuples and the possibility to sorting the dictionary by keys or values.

### Supported functions

<b>All functions of Dictionary &lt;K,V&gt;</b>

* getByIndex
* getByIndices
* getByIndicesAsList
* getKeyByIndex
* getKeysByIndices
* getKeysByIndicesAsList
* removeByIndex
* removeByIndices
* setByIndex
* setByIndices
* sortByKey
* sortByValue

### Usage

```ts
import {SortedDictionary} from 'yaca';
import {Comparer} from 'yaca';

// Default constructor
let dictionary: SortedDictionary<number, string> = new SortedDictionary<number, string>();

// Constructor with initial value
let dictionary2: Dictionary<number, string> = new Dictionary<number, string>([1,2,3],["one","two","three"]]);

// -> All operation of the standard Dictionary<K,V> class possible

let value: string = dictionary2.getByIndex(1); // Returns "two" (key=2; index=1; value="two")

dictionary2.removeByIndex(2); // Removes the third element (key=3; index=2; value="three")

dictionary2.sortByKey(); // Sort the dictionary by its keys (using default behavior of number)

dictionary2.sortByKey(Comparer.compareNumbers); // Sort the dictionary by its keys (using a comparison function)

dictionary2.sortByValue(); // Sort the dictionary by its values (using default behavior of string)

```

See  [The SortedDictionary documentation page](https://rabanti-github.github.io/yaca/classes/_src_sorteddictionary_.sorteddictionary.html) for further details:

* Constructors
* Properties
* Methods