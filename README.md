![](https://res.cloudinary.com/dlacw28m9/image/upload/v1583255567/hermetrics.js_wmbdhh.png)


Javascript library for distance and similarity metrics. Javascript translation from [hermetrics.py](https://github.com/kampamocha/hermetrics).

![Build Status](https://travis-ci.com/weylermaldonado/hermetricsjs.svg?branch=master)

# Content

* [Installation](#installation)
* [Usage](#usage)
* [Metrics](#metrics)
  * [Levenshtein]((#levenshtein))

# Installation <a name="installation"></a>

From npm

```bash
$ npm i hermetricsjs --save
```


# Usage <a name="usage"></a>

Require the package and import the desired class:
```javascript
const { Levenshtein } = require('hermetricsjs');

const levenshtein = new Levenshtein();

levenshtein.distance('start', 'end');
levenshtein.maxDistance('start', 'end');
```
# Metrics <a name="metrics"></a>

## Overview

Hermetrics is a library designed for use in experimentation with string metrics. The library features a base class Metric which is highly configurable and can be used to implement custom metrics.

Based on Metric are some common string metrics already implemented to compute the distance between two strings. Some common edit distance metrics such as Levenshtein can be parametrized with different costs for each edit operation, althought have been only thoroughly tested with costs equal to 1. Also, the implemented metrics can be used to compare any iterable in addition to strings, but more tests are needed.

A metric has three main methods distance, normalized_distance and similarity. In general the distance method computes the absolute distance between two strings, whereas normalized_distance can be used to scale the distance to a particular range, usually (0,1), and the similarity method being normally defined as (1-normalized_distance).

The normalization of the distance can be customized overriding the auxiliary methods for its computation. Those methods are maxDistance, minDistance and normalize.

## *Metric* class

Metric is a base class that can receive as arguments six specific functions to be used as methods for the metric being implemented. The class constructor just assign the functions received as parameters to the class methods. If you omit some parameter then a default method is used, which allows you to implement metrics without the need to rewrite some of the functionality that is common among metrics.

## Default methods

Description of default methods for the Metric class.

In general a method of a metric receives three parameters:

- *source:* The source string or iterable to compare.
- *target:* The target string or iterable to compare.
- *costs:* An *optional* object that contains the insertion, deletion and substitution custom value. By default the value is **1**.

|Method | Description |
|--------|-------------|
|Distance| The distance method computes the total cost of transforming the source string on the target string. The default method just return 0 if the strings are equal and 1 otherwise.|
|maxDistance| Returns the maximum value of the distance between source and target given a specific cost for edit operations. The default method just return 1 given source and target don't have both length=0, in that case just return 0. |


## Levenshtein metric  <a name="levenshtein"></a>
Levenshtein distance is usually known as "the" edit distance. It is defined as the minimum number of edit operations (deletion, insertion and substitution) to transform the source string into the target string. The algorithm for distance computation is implemented using the dynamic programming approach with the full matrix construction, althought there are optimizations for time and space complexity those are not implemented here.

## Contributors

-  [Juan Negron](https://github.com/juan-negron)
-  [Diego Campos](https://github.com/kampamocha)