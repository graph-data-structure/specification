import {filter} from '@iterable-iterator/filter';
import {map} from '@iterable-iterator/map';
import {NotImplementedError} from '@failure-abstraction/error';

const other = ([t, u], v) => (t === v ? u : t);

export default class AbstractGraph {
	vadd(_) {
		throw new NotImplementedError();
	}

	vdel(_) {
		throw new NotImplementedError();
	}

	eadd(_u, _v) {
		throw new NotImplementedError();
	}

	edel(_) {
		throw new NotImplementedError();
	}

	vitr() {
		throw new NotImplementedError();
	}

	eitr() {
		throw new NotImplementedError();
	}

	iitr(v) {
		return filter((e) => {
			const [t, u] = this.endpoints(e);
			return t === v || u === v;
		}, this.eitr());
	}

	nitr(v) {
		return map((e) => other(this.endpoints(e), v), this.iitr(v));
	}

	vertices() {
		return this.vitr();
	}

	edges() {
		return map((e) => [...this.endpoints(e), e], this.eitr());
	}

	incident(u) {
		return map((e) => [...this.endpoints(e), e], this.iitr(u));
	}

	endpoints(_e) {
		throw new NotImplementedError();
	}

	initr(_) {
		throw new NotImplementedError();
	}

	outitr(_) {
		throw new NotImplementedError();
	}

	dpitr(u) {
		return map((e) => other(this.endpoints(e), u), this.initr(u));
	}

	dsitr(u) {
		return map((e) => other(this.endpoints(e), u), this.outitr(u));
	}

	ingoing(u) {
		return map((e) => [other(this.endpoints(e), u), u, e], this.initr(u));
	}

	outgoing(u) {
		return map((e) => [u, other(this.endpoints(e), u), e], this.outitr(u));
	}

	reverse() {
		throw new NotImplementedError();
	}
}
