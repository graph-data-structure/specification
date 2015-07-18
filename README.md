[js-graph-spec](http://aureooms.github.io/js-graph-spec)
==

Graph specification code bricks for JavaScript.

```js
graphspec.test( "My graph implementation" , MyGraphConstructor ) ;
```

[![NPM license](http://img.shields.io/npm/l/aureooms-js-graph-spec.svg?style=flat)](https://raw.githubusercontent.com/aureooms/js-graph-spec/master/LICENSE)
[![NPM version](http://img.shields.io/npm/v/aureooms-js-graph-spec.svg?style=flat)](https://www.npmjs.org/package/aureooms-js-graph-spec)
[![Bower version](http://img.shields.io/bower/v/aureooms-js-graph-spec.svg?style=flat)](http://bower.io/search/?q=aureooms-js-graph-spec)
[![Build Status](http://img.shields.io/travis/aureooms/js-graph-spec.svg?style=flat)](https://travis-ci.org/aureooms/js-graph-spec)
[![Coverage Status](http://img.shields.io/coveralls/aureooms/js-graph-spec.svg?style=flat)](https://coveralls.io/r/aureooms/js-graph-spec)
[![Dependencies Status](http://img.shields.io/david/aureooms/js-graph-spec.svg?style=flat)](https://david-dm.org/aureooms/js-graph-spec#info=dependencies)
[![devDependencies Status](http://img.shields.io/david/dev/aureooms/js-graph-spec.svg?style=flat)](https://david-dm.org/aureooms/js-graph-spec#info=devDependencies)
[![Code Climate](http://img.shields.io/codeclimate/github/aureooms/js-graph-spec.svg?style=flat)](https://codeclimate.com/github/aureooms/js-graph-spec)
[![NPM downloads per month](http://img.shields.io/npm/dm/aureooms-js-graph-spec.svg?style=flat)](https://www.npmjs.org/package/aureooms-js-graph-spec)
[![GitHub issues](http://img.shields.io/github/issues/aureooms/js-graph-spec.svg?style=flat)](https://github.com/aureooms/js-graph-spec/issues)
[![Inline docs](http://inch-ci.org/github/aureooms/js-graph-spec.svg?branch=master&style=shields)](http://inch-ci.org/github/aureooms/js-graph-spec)

Can be managed through [jspm](https://github.com/jspm/jspm-cli),
[duo](https://github.com/duojs/duo),
[component](https://github.com/componentjs/component),
[bower](https://github.com/bower/bower),
[ender](https://github.com/ender-js/Ender),
[jam](https://github.com/caolan/jam),
[spm](https://github.com/spmjs/spm),
and [npm](https://github.com/npm/npm).

## Install

### jspm
```terminal
jspm install github:aureooms/js-graph-spec
# or
jspm install npm:aureooms-js-graph-spec
```
### duo
No install step needed for duo!

### component
```terminal
component install aureooms/js-graph-spec
```

### bower
```terminal
bower install aureooms-js-graph-spec
```

### ender
```terminal
ender add aureooms-js-graph-spec
```

### jam
```terminal
jam install aureooms-js-graph-spec
```

### spm
```terminal
spm install aureooms-js-graph-spec --save
```

### npm
```terminal
npm install aureooms-js-graph-spec --save
```

## Require
### jspm
```js
let graphspec = require( "github:aureooms/js-graph-spec" ) ;
// or
import graphspec from 'aureooms-js-graph-spec' ;
```
### duo
```js
let graphspec = require( "aureooms/js-graph-spec" ) ;
```

### component, ender, spm, npm
```js
let graphspec = require( "aureooms-js-graph-spec" ) ;
```

### bower
The script tag exposes the global variable `graphspec`.
```html
<script src="bower_components/aureooms-js-graph-spec/js/dist/graph-spec.min.js"></script>
```
Alternatively, you can use any tool mentioned [here](http://bower.io/docs/tools/).

### jam
```js
require( [ "aureooms-js-graph-spec" ] , function ( graphspec ) { ... } ) ;
```
