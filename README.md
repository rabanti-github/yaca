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
* Native sorting of the types number, string, boolean and Date (in List class)
* Possibility of the implementation of a compareTo function in classes for sorting purpose (interface IComparer)
* Possibility to sort SortedDictionary by key or value, according to the default behavior, a defined compariosn method or an implementation of a compareTo function
* Provided static compareTo functions for the types number, string, boolean and Date (module Comparer)

See the **[Change Log](https://github.com/rabanti-github/yaca/blob/master/changelog.md)** for recent updates.

## Installation

```bash
npm install -S yaca
```

## Usage (List&lt;T&gt;)

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
        });

numberList.clear();
```

See  [The List documentation page](https://rabanti-github.github.io/yaca/classes/_src_list_.list.html) for further details:

* Constructors
* Properties
* Methods


## Usage (Dictionary&lt;K,V&gt;)

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
        });

dictionary3.clear();
```

See  [The Dictionary documentation page](https://rabanti-github.github.io/yaca/classes/_src_dictionary_.dictionary.html) for further details:

* Constructors
* Properties
* Methods


## Usage (SortedDictionary&lt;K,V&gt;)

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