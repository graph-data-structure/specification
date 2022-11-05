import AbstractDirectedGraph from './AbstractDirectedGraph.js';

const isEdge =
	(u, v) =>
	([x, y]) =>
		u === x && v === y;

export default class DirectedGraph extends AbstractDirectedGraph {
	eadd(u, v) {
		const existingEdge = this.E.find(isEdge(u, v));
		if (existingEdge !== undefined) return existingEdge;
		return super.eadd(u, v);
	}
}
