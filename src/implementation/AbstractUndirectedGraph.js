import Graph from './Graph.js';

export default class AbstractUndirectedGraph extends Graph {
	initr(u) {
		return this.iitr(u);
	}

	outitr(u) {
		return this.iitr(u);
	}

	reverse() {}
}
