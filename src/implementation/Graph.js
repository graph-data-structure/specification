import {filter} from '@iterable-iterator/filter';
import {iter} from '@iterable-iterator/iter';
import {list} from '@iterable-iterator/list';

import AbstractGraph from './AbstractGraph.js';

export default class Graph extends AbstractGraph {
	constructor() {
		super();
		this.V = [];
		this.E = [];
	}

	vadd(value) {
		const v = {value};
		this.V.push(v);
		return v;
	}

	vdel(v) {
		this.V = list(filter((u) => u !== v, this.V));
		this.E = list(filter(([t, u]) => t !== v && u !== v, this.E));
	}

	eadd(u, v) {
		const insertedEdge = [u, v];
		this.E.push(insertedEdge);
		return insertedEdge;
	}

	edel(e) {
		this.E = list(filter((x) => x !== e, this.E));
	}

	vitr() {
		return iter(this.V);
	}

	eitr() {
		return iter(this.E);
	}

	endpoints([u, v]) {
		return [u, v];
	}
}
