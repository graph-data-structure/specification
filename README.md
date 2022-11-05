:notebook_with_decorative_cover:
[@graph-data-structure/specification](https://graph-data-structure.github.io/specification)
==

Graph data structure specification for JavaScript.

```js
// eslint-disable-next-line ava/use-test
import ava from 'ava';
import * as spec from '@graph-data-structure/specification';
spec.Graph(ava, "My graph implementation", MyGraphConstructor);
```

[![License](https://img.shields.io/github/license/graph-data-structure/specification.svg)](https://raw.githubusercontent.com/graph-data-structure/specification/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@graph-data-structure/specification.svg)](https://www.npmjs.org/package/@graph-data-structure/specification)
[![Tests](https://img.shields.io/github/workflow/status/graph-data-structure/specification/ci?event=push&label=tests)](https://github.com/graph-data-structure/specification/actions/workflows/ci.yml?query=branch:main)
[![Dependencies](https://img.shields.io/librariesio/github/graph-data-structure/specification.svg)](https://github.com/graph-data-structure/specification/network/dependencies)
[![GitHub issues](https://img.shields.io/github/issues/graph-data-structure/specification.svg)](https://github.com/graph-data-structure/specification/issues)
[![Downloads](https://img.shields.io/npm/dm/@graph-data-structure/specification.svg)](https://www.npmjs.org/package/@graph-data-structure/specification)

[![Code issues](https://img.shields.io/codeclimate/issues/graph-data-structure/specification.svg)](https://codeclimate.com/github/graph-data-structure/specification/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/graph-data-structure/specification.svg)](https://codeclimate.com/github/graph-data-structure/specification/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/graph-data-structure/specification/main.svg)](https://codecov.io/gh/graph-data-structure/specification)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/graph-data-structure/specification.svg)](https://codeclimate.com/github/graph-data-structure/specification/trends/technical_debt)
[![Documentation](https://graph-data-structure.github.io/specification/badge.svg)](https://graph-data-structure.github.io/specification/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@graph-data-structure/specification)](https://bundlephobia.com/result?p=@graph-data-structure/specification)


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
