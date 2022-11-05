import {filter} from '@iterable-iterator/filter';
import {list} from '@iterable-iterator/list';
import {map} from '@iterable-iterator/map';

import Graph from './Graph.js';

const isIngoing =
	(v) =>
	([, u]) => {
		return u === v;
	};

const isOutgoing =
	(v) =>
	([t]) => {
		return t === v;
	};

const reverse = (e) => {
	const v = e.pop();
	const u = e.pop();
	e.push(v, u);
	return e;
};

export default class AbstractDirectedGraph extends Graph {
	initr(u) {
		return filter(isIngoing(u), this.E);
	}

	outitr(u) {
		return filter(isOutgoing(u), this.E);
	}

	reverse() {
		this.E = list(map(reverse, this.E));
	}
}
