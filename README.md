![](https://res.cloudinary.com/dlacw28m9/image/upload/v1583255567/hermetrics.js_wmbdhh.png)


Javascript library for distance and similarity metrics. Javascript translation from [hermetrics.py](https://github.com/kampamocha/hermetrics).

![Build Status](https://travis-ci.com/weylermaldonado/hermetricsjs.svg?branch=master)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/03f72b3394744c8bb5a874d4b1156350)](https://app.codacy.com/manual/weylermaldonado/hermetricsjs?utm_source=github.com&utm_medium=referral&utm_content=weylermaldonado/hermetricsjs&utm_campaign=Badge_Grade_Dashboard)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


# Content

* [Installation](#installation)
* [Usage](#usage)
* [Metrics](#metrics)
  * [Levenshtein](#levenshtein)
  * [Jaro](#jaro)
  * [Jaro-Winkler](#jaro-winkler)
  * Hamming (work in progress)
  * OSA (work in progress)
  * Damerau-Levenshtein (work in progress)
  * Jaccard (work in progress)
  * Dice (work in progress)
  * Metric comparator (work in progress)

# Installation <a name="installation"></a>

From npm

```bash
$ npm i hermetrics --save
```


# Usage <a name="usage"></a>

Require the package and import the desired class:
```javascript
const { Levenshtein } = require('hermetrics');

const levenshtein = new Levenshtein();

levenshtein.distance('start', 'end');
levenshtein.maxDistance('start', 'end');
```

Using [custom](#custom) operation costs:

```javascript
const { Levenshtein } = require('hermetrics');

const levenshtein = new Levenshtein();

const opts = {
  deletionCost: 3,
  substitutionCost: 2,
  deletionCost: 5
};

levenshtein.distance('start', 'end', opts);
levenshtein.maxDistance('start', 'end', opts);
```

# Metrics <a name="metrics"></a>

## Overview

Hermetrics is a library designed for use in experimentation with string metrics. The library features a base class Metric which is highly configurable and can be used to implement custom metrics.

Based on Metric are some common string metrics already implemented to compute the distance between two strings. Some common edit distance metrics such as Levenshtein can be parametrized with different costs for each edit operation, althought have been only thoroughly tested with costs equal to 1. Also, the implemented metrics can be used to compare any iterable in addition to strings, but more tests are needed.

A metric has three main methods distance, normalizeDistance and similarity. In general the distance method computes the absolute distance between two strings, whereas normalizeDistance can be used to scale the distance to a particular range, usually (0,1), and the similarity method being normally defined as (1-normalizeDistance).

The normalization of the distance can be customized overriding the auxiliary methods for its computation. Those methods are maxDistance, minDistance and normalize.

## *Metric* class

Metric is a base class that can receive as arguments an metric name, and contains six specific functions to be used as methods for the metric being implemented. 

## Default methods <a name="custom"></a>

Description of default methods for the Metric class.

In general a method of a metric receives three parameters:

- *source:* The source string or iterable to compare.
- *target:* The target string or iterable to compare.
- *costs:* An *optional* object that contains the insertion, deletion and substitution custom value. By default the value is **1**.

|Method | Description |
|--------|-------------|
|Distance| The distance method computes the total cost of transforming the source string on the target string. The default method just return 0 if the strings are equal and 1 otherwise.|
|maxDistance| Returns the maximum value of the distance between source and target given a specific cost for edit operations. The default method just return 1 given source and target don't have both length=0, in that case just return 0. |
|minDistance| Return 0.|
| normalize | This method is used to scale a value between two limits, usually those obtained by maxDistance and minDistance, to the (0,1) range. Unlike the other methods, normalize doesn't receive the usual arguments (source, target and cost), instead receive the following: x. The value to be normalized. low=0. The minimum value for the normalization, usually obtained with minDistance method. high=1. The maximum value for the normalization, usually obtained with maxDistance method. |
| normalize distance | Scale the distance between source and target for specific cost to the (0,1) range using maxDistance, minDistance and normalize. | 
| similarity | Computes how similar are source and target given a specific cost. By default defined as 1 - normalizedDistance so the result is also in the (0,1) range. |


## Levenshtein metric  <a name="levenshtein"></a>
Levenshtein distance is usually known as "the" edit distance. It is defined as the minimum number of edit operations (deletion, insertion and substitution) to transform the source string into the target string. The algorithm for distance computation is implemented using the dynamic programming approach with the full matrix construction, althought there are optimizations for time and space complexity those are not implemented here.

## Jaro metric <a name="jaro"></a>
Jaro distance is based on the matching characters present on two strings and the number of transpositions between them. A matching occurs when a character of a string is present on the other string but in a position no further away that certain threshold based on the lenght of the strings. The Jaro distance is normalized.

## Jaro-Winkler <a name="jaro-winkler"></a>
Extension of Jaro distance with emphasis on the first characters of the strings, so strings that have matching characters on the beginning have more similarity than those that have matching characters at the end. This metric depends on an additional parameter p (with 0<=p<=0.25 and default p=0.1) that is a weighting factor for additional score obtained for matching characters at the beginning of the strings..

## Contributors

-  [Juan Negron](https://github.com/juan-negron)
-  [Diego Campos](https://github.com/kampamocha)