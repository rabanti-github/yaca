# CHANGE LOG

***v1.2.3***

---
Date: 2019-07-30

Release type: Minor release / Maintenance

* Security updates of dev dependencies

***v1.2.2***

---
Date: 2018-10-25

Release type: Minor release / Maintenance

* Pushed DevDependencies to the most recent versions
* Fixed typos and improved documentation
* Code formatting
* Updated package.json for better multi-platform support (dev)

***v1.2.1***

---
Date: 2018-06-24

Release type: Minor release / Maintenance / Non-critical

* Pushed DevDependencies to the most recent versions
* Fixed deprecation issue regarding prepublish

***v1.2.0***

---
Date: 2017-08-18

Release type: Minor release / Bugfix

* Fixed handling of forEach behavior (break condition)
* Added continue (optional) and break functions for better forEach control
* Added more tests
* Added more documentation
* Fixed typos

***v1.1.1***

---
Date: 2017-08-16

Release type: Minor release

* Added class SortedDictionary<K,V>
* Added more tests
* Updated dependencies
* Updated changelog (v1.1.0 to 1.1.1)

***v1.0.4***

---
Date: 2017-08-15

Release type: Bugfix

* Fixed a bug in the method of getValues() in the Dictionary class
* Added the possibility to sort any types of objects using the static string comparison method

***v1.0.3***

---
Date: 2017-08-05

Release type: Cleanup / Non-critical

* Code clean-up
* Added the possibility to indicate that the last item is reached in the next() method by passing 'true' as value
* Fixed typos
* Removed further unnecessary files files in the released module

***v1.0.2***

---
Date: 2017-08-04

Release type: Cleanup / Non-critical

* Coverage now on 100% for real
* Code clean-up
* Fixed typos

***v1.0.1***

---
Date: 2017-08-04

Release type: Major release

* Coverage up to 100%
* New module Comparer with static compareTo functions
* New interface IComparer: compareTo function implementation can be used for sorting
* Sorting of lists is now working without declaration of a compareTo function for number, string, boolean and Date
* The sort function in the List class accepts now no arguments (for the basic types), a compareTo function as argument. It checks also for the implementation of the compareTo interface
* Several bug fixes
* Removed several unnecessary files in the released module

***v0.1.13***

---
Date: 2017-07-26

Release type: Bugfix

* Fixed a bug in the published structure
* Further documentation issues fixed
* Revoked / removed coveralls config file (accidentally published)

***v0.1.12***

---
Date: 2017-07-26

Release type: Bugfix

* Documentation issue fixed

***v0.1.11***

---
Date: 2017-07-26

Release type: Optimization / Bugfix

* Optimization of the Dictionary class (not officially released)
* Several bugs in the Dictionary class fixed
* >98% test coverage of the Dictionary class -> Ready to release
* Last unstable release before v 1.0.x

***v0.1.10***

---
Date: 2017-07-23

Release type: Optimization / Bugfix

* Optimization of the Dictionary class (not officially released)
* Several bugs in the Dictionary class fixed
* 77% test coverage of the Dictionary class -> Ready to release soon

***v0.1.9***

---
Date: 2017-07-22

Release type: Optimization / Bugfix

* Optimization of the Dictionary class (not officially released)
* Several bugs in the Dictionary class fixed
* Implementation of an hash code override function in the Dictionary class

***v0.1.8***

---
Date: 2017-07-19

Release type: Optimization / Features

* Optimization of the List class
* Testing for the list class completed
* Added a peek() function

***v0.1.7***

---
Date: 2017-07-18

Release type: Optimization

* Several additional checks
* Optimization of the List class
* Implementation of testing (work in progress)

***v0.1.6***

---
Date: 2017-07-17

Release type: Bugfix

* Several bugfixes
* Optimization of the List class
* Change of dependency from lodash to lodash.isequal

***v0.1.5***

---
Date: 2017-07-17

Release type: Bugfix

* Fixed a bug in removeAt

***v0.1.4***

---
Date: 2017-07-17

Release type: Bugfix

* Fixed a bug regarding comparison
* Code clean-up
* Added dependency lodash.isequal

***v0.1.3***

---
Date: 2017-07-13

Release type: Cleanup / Non-critical

* Fixed an issue with the readme
* Code clean-up
* Added further dev-dependencies (tslint, typedoc)

***v0.1.2***

---
Date: 2017-07-12

Release type: Initial release

* Initial release
