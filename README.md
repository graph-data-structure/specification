[@aureooms/js-graph-spec](https://make-github-pseudonymous-again.github.io/js-graph-spec)
==

Graph specification code bricks for JavaScript. Parent is
[@aureooms/js-gn](https://github.com/make-github-pseudonymous-again/js-gn).

```js
graphspec.Graph( "My graph implementation" , MyGraphConstructor ) ;
```

[![License](https://img.shields.io/github/license/make-github-pseudonymous-again/js-graph-spec.svg)](https://raw.githubusercontent.com/make-github-pseudonymous-again/js-graph-spec/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@aureooms/js-graph-spec.svg)](https://www.npmjs.org/package/@aureooms/js-graph-spec)
[![Tests](https://img.shields.io/github/workflow/status/make-github-pseudonymous-again/js-graph-spec/ci:cover?event=push&label=tests)](https://github.com/make-github-pseudonymous-again/js-graph-spec/actions/workflows/ci:cover.yml?query=branch:main)
[![Dependencies](https://img.shields.io/librariesio/github/make-github-pseudonymous-again/js-graph-spec.svg)](https://github.com/make-github-pseudonymous-again/js-graph-spec/network/dependencies)
[![GitHub issues](https://img.shields.io/github/issues/make-github-pseudonymous-again/js-graph-spec.svg)](https://github.com/make-github-pseudonymous-again/js-graph-spec/issues)
[![Downloads](https://img.shields.io/npm/dm/@aureooms/js-graph-spec.svg)](https://www.npmjs.org/package/@aureooms/js-graph-spec)

[![Code issues](https://img.shields.io/codeclimate/issues/make-github-pseudonymous-again/js-graph-spec.svg)](https://codeclimate.com/github/make-github-pseudonymous-again/js-graph-spec/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/make-github-pseudonymous-again/js-graph-spec.svg)](https://codeclimate.com/github/make-github-pseudonymous-again/js-graph-spec/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/make-github-pseudonymous-again/js-graph-spec/main.svg)](https://codecov.io/gh/make-github-pseudonymous-again/js-graph-spec)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/make-github-pseudonymous-again/js-graph-spec.svg)](https://codeclimate.com/github/make-github-pseudonymous-again/js-graph-spec/trends/technical_debt)
[![Documentation](https://make-github-pseudonymous-again.github.io/js-graph-spec//badge.svg)](https://make-github-pseudonymous-again.github.io/js-graph-spec//source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@aureooms/js-graph-spec)](https://bundlephobia.com/result?p=@aureooms/js-graph-spec)

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
jspm install npm:@aureooms/js-graph-spec
```
### duo
No install step needed for duo!

### component
```terminal
component install aureooms/js-graph-spec
```

### bower
```terminal
bower install @aureooms/js-graph-spec
```

### ender
```terminal
ender add @aureooms/js-graph-spec
```

### jam
```terminal
jam install @aureooms/js-graph-spec
```

### spm
```terminal
spm install @aureooms/js-graph-spec --save
```

### npm
```terminal
npm install @aureooms/js-graph-spec --save
```

## Require
### jspm
```js
let graphspec = require( "github:aureooms/js-graph-spec" ) ;
// or
import graphspec from '@aureooms/js-graph-spec' ;
```
### duo
```js
let graphspec = require( "aureooms/js-graph-spec" ) ;
```

### component, ender, spm, npm
```js
let graphspec = require( "@aureooms/js-graph-spec" ) ;
```

### bower
The script tag exposes the global variable `graphspec`.
```html
<script src="bower_components/@aureooms/js-graph-spec/js/dist/graph-spec.min.js"></script>
```
Alternatively, you can use any tool mentioned [here](http://bower.io/docs/tools/).

### jam
```js
require( [ "@aureooms/js-graph-spec" ] , function ( graphspec ) { ... } ) ;
```

## Signatures

### Graphs, DiGraphs, MultiGraphs, and MultiDiGraphs

#### `Graph`, `DiGraph`, `MultiGraph`, or `MultiDiGraph`

Create a new graph.

```js
let G = new Graph( ) ;
// ...
let G = new DiGraph( ) ;
// ...
let G = new MultiGraph( ) ;
// ...
let G = new MultiDiGraph( ) ;
// ...
```

#### `vadd`

Add a vertex to graph `G`.

```js
let u = G.vadd( ) ;
```

#### `vdel`

Delete vertex `u` from graph `G`.

```js
G.vdel( u ) ;
```

#### `eadd`

Add edge `(u,v)` to graph `G`.

```js
let e = G.eadd( u , v ) ;
```

#### `edel`

Delete edge `e` from graph `G`.

```js
G.edel( e ) ;
```

#### `vitr`

Get an iterator over vertex references in graph `G`.

```js
for ( let u of G.vitr( ) ) ... ;
```

#### `eitr`

Get an iterator over edge references in graph `G`.

```js
for ( let e of g.eitr( ) ) ... ;
```

#### `iitr`

Get an iterator over edge references of edges incident to `u` in graph `G`.

```js
for ( let e of G.iitr( u ) ) ... ;
```


#### `nitr`

Get an iterator over vertex references of neighbors of `u` in graph `G`.

```js
for ( let v of G.nitr( u ) ) ... ;
```

#### `vertices`

Get an iterator over vertices in graph `G`.

```js
for ( let u of G.vertices( ) ) ... ;
```

#### `edges`

Get an iterator over edges in graph `G`.

```js
for ( let [ u , v , e ] of G.edges( ) ) ... ;
```

#### `incident`

Get an iterator over edges incident to `w` in graph `G`.

```js
for ( let [ u , v , e ] of G.incident( w ) ) ... ;
```

#### `endpoints`

Get endpoints `u` and `v` of an edge reference `e` in graph `G`.

```js
let [ u , v ] = G.endpoints( e ) ;
```

### DiGraphs and MultiDiGraphs

These methods must also be implemented (with the same invariants)
in Graphs and MultiGraphs for convenience.

#### `initr`

Get an iterator over edge references of ingoing edges of `u` in graph `G`.

```js
for ( let e of G.initr( u ) ) ... ;
```

#### `outitr`

Get an iterator over edge references of outgoing edges of `u` in graph `G`.

```js
for ( let e of G.outitr( u ) ) ... ;
```

#### `dpitr`

Get an iterator over direct predecessors of `u` in graph `G`.

```js
for ( let v of G.dpitr( u ) ) ... ;
```

#### `dsitr`

Get an iterator over direct successors of `u` in graph `G`.

```js
for ( let v of G.dsitr( u ) ) ... ;
```

#### `ingoing`

Get an iterator over ingoing edges of `w` in graph `G`.
The invariant `v === w` must hold.

```js
for ( let [ u , v , e ] of G.ingoing( w ) ) ... ;
```

#### `outgoing`

Get an iterator over outgoing edges of `w` in graph `G`.
The invariant `u === w` must hold.

```js
for ( let [ u , v , e ] of G.outgoing( w ) ) ... ;
```

#### `reverse`

Reverse the directions of edges in  `G`.

```js
G.reverse( ) ;
```
