import AbstractUndirectedGraph from './AbstractUndirectedGraph.js';

const isEdge =
	(u, v) =>
	([x, y]) => {
		return (u === x && v === y) || (u === y && v === x);
	};

export default class UndirectedGraph extends AbstractUndirectedGraph {
	eadd(u, v) {
		const existingEdge = this.E.find(isEdge(u, v));
		if (existingEdge !== undefined) return existingEdge;
		return super.eadd(u, v);
	}
}
