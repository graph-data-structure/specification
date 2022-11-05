import test from 'ava';

import * as spec from '#module';

spec.graph(test, 'UndirectedGraph', spec.UndirectedGraph);
spec.multiGraph(test, 'UndirectedMultiGraph', spec.UndirectedMultiGraph);
spec.digraph(test, 'DirectedGraph', spec.DirectedGraph);
spec.multiDigraph(test, 'DirectedMultiGraph', spec.DirectedMultiGraph);
