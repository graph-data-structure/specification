import test from 'ava';

import {DoublyLinkedList as List} from '@aureooms/js-dll';

import adjacencylist from '@aureooms/js-adjacency-list';
import adjacencymatrix from '@aureooms/js-adjacency-matrix';
import * as spec from '../../src/index.js';

spec.graph(test, 'Adjacency Matrix Graph', adjacencymatrix.Graph);
spec.multiGraph(
	test,
	'Adjacency List MultiGraph',
	adjacencylist.MultiGraph(List), // eslint-disable-line new-cap
);
spec.digraph(test, 'Adjacency Matrix DiGraph', adjacencymatrix.DiGraph);
spec.multiDigraph(
	test,
	'Adjacency List MultiDiGraph',
	adjacencylist.MultiDiGraph(List, Map), // eslint-disable-line new-cap
);
