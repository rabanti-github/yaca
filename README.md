# YACA

**Y**et **A**nother **C**ollection **A**pproach

## Introduction

YACA is another approach to introduce Collections to TypeScript / JavaScript like known in Java, C# or other object-oriented programming languages. There are other approaches, but sometimes, small things regarding the convenience are missing.

[![Coverage Status](https://coveralls.io/repos/github/rabanti-github/yaca/badge.svg?branch=master)](https://coveralls.io/github/rabanti-github/yaca?branch=master)
![npm](https://img.shields.io/npm/v/yaca.svg?maxAge=2592000)
![license](https://img.shields.io/github/license/rabanti-github/yaca.svg)

YACA contains at the moment **List&lt;T&gt;** and **Dictionary&lt;K,V&gt;** as collection types. Further types (e.g. Stack or SortedDictionary) are planned.

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
numberList.clear();
```

See  [The List documentation page](https://rabanti-github.github.io/yaca/classes/_src_list_list.html) for further details:

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
dictionary3.clear();
```

See  [The Dictionary documentation page](https://rabanti-github.github.io/yaca/classes/_src_dictionary_dictionary.html) for further details:

* Constructors
* Properties
* Methods
