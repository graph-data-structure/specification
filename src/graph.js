import {list} from '@iterable-iterator/list';
import {range} from '@iterable-iterator/range';
import {map} from '@iterable-iterator/map';
import {chain} from '@iterable-iterator/chain';
import {exhaust} from '@iterable-iterator/consume';
import {all} from '@iterable-iterator/reduce';
import {len, isEmpty} from '@iterable-iterator/cardinality';
import {set} from '@collection-abstraction/set';

import methods from './methods.js';

export default function graph(test, title, Constructor) {
	methods(test, title, Constructor);

	test('graph-spec : Graph simple test > ' + title, (t) => {
		const G = new Constructor();

		const u = G.vadd('A');
		const v = G.vadd('B');

		const uv = G.eadd(u, v);

		t.true(set(G.vitr()).isequal(G.vertices()));

		t.true(set([u, v]).isequal(G.vitr()));
		let [a, b] = G.edges().next().value;
		t.true(set([a, b]).isequal([u, v]));

		G.reverse();

		t.true(set([u, v]).isequal(G.vitr()));
		t.is(G.eitr().next().value, uv);
		[a, b] = G.edges().next().value;
		t.true(set([a, b]).isequal([u, v]));

		const vu = G.eadd(v, u);
		t.is(len(G.eitr()), 1);
		t.is(uv, vu);

		G.edel(uv);
		t.true(isEmpty(G.eitr()));

		G.vdel(u);
		G.vdel(v);
		t.true(isEmpty(G.vitr()));
	});

	test('graph-spec : Graph #1 > ' + title, (t) => {
		const g = new Constructor();

		const v = [];
		const e = [];

		const n = 11;

		for (let i = 0; i < n; ++i) v[i] = g.vadd(i);
		t.true(set(g.vitr()).isequal(g.vertices()));

		e[1] = [];
		e[1][0] = g.eadd(v[1], v[9]);
		e[0] = [];
		e[0][0] = g.eadd(v[0], v[10]);
		e[0][1] = g.eadd(v[0], v[5]);
		e[0][2] = g.eadd(v[0], v[3]);
		e[0][3] = g.eadd(v[0], v[1]);
		e[0][4] = g.eadd(v[0], v[0]);
		e[1][1] = e[0][3];
		e[4] = [];
		e[4][0] = g.eadd(v[4], v[7]);

		const r = [0, 1, 4];

		// Tests

		let k = 0;
		let notseen = set(v);

		exhaust(
			map((j) => {
				t.true(notseen.has(j), 'vitr ' + k);
				notseen.remove(j);
				++k;
			}, g.vitr()),
		);

		k = 0;
		let alledges = e[0].concat([e[1][0]]).concat(e[4]);
		notseen = set(alledges);

		exhaust(
			map((j) => {
				t.true(notseen.has(j), 'eitr ' + k);
				notseen.remove(j);
				++k;
			}, g.eitr()),
		);

		t.is(k, alledges.length, 'check edges count before del');

		for (const m of r) {
			k = e[m].length;

			notseen = set(e[m]);

			exhaust(
				map((x) => {
					--k;
					t.true(notseen.has(x), 'iitr ' + m + ' ' + k);
					notseen.remove(x);
				}, g.iitr(v[m])),
			);
		}

		// Delete edges 1 0 , 0 2 , 4 0
		g.edel(e[1].splice(0, 1)[0]);

		g.edel(e[0].splice(2, 1)[0]);

		g.edel(e[4].splice(0, 1)[0]);

		k = 0;
		alledges = e[0].concat(e[4]);
		notseen = set(alledges);

		exhaust(
			map((j) => {
				t.true(notseen.has(j), 'eitr ' + k);
				notseen.remove(j);
				++k;
			}, g.eitr()),
		);

		t.is(k, alledges.length, 'check edges count after del');

		k = 0;
		notseen = set(map((e) => g.endpoints(e)[1], e[0]));

		exhaust(
			map((j) => {
				t.true(notseen.has(j), 'nitr ' + k);
				notseen.remove(j);
				++k;
			}, g.nitr(v[0])),
		);

		t.is(k, e[0].length, 'check neighbour count after del');

		for (const m of r) {
			k = e[m].length;

			notseen = set(e[m]);

			exhaust(
				map((x) => {
					--k;
					t.true(notseen.has(x), 'iitr ' + m + ' ' + k);
					notseen.remove(x);
				}, g.iitr(v[m])),
			);
		}

		// Delete vertex 3

		g.vdel(v.splice(3, 1)[0]);

		k = 0;
		notseen = set(v);

		exhaust(
			map((j) => {
				t.true(notseen.has(j), 'vitr ' + k);
				notseen.remove(j);
				++k;
			}, g.vitr()),
		);

		t.is(k, v.length, 'check vertex count after del');

		e[0].splice(2, 1);

		// Delete remaining edges
		for (const m of r) {
			while (e[m].length > 0) g.edel(e[m].splice(0, 1)[0]);
		}

		t.true(isEmpty(g.eitr()), 'no more edges');

		t.true(
			all(map((i) => isEmpty(g.iitr(i)), g.vitr())),
			'no more incident edges',
		);

		// Delete remaining vertices
		while (v.length > 0) g.vdel(v.splice(0, 1)[0]);

		t.true(isEmpty(g.vitr()), 'no more vertices');
	});

	test('graph-spec : Graph #2 > ' + title, (t) => {
		const g = new Constructor();

		const v = [];
		const e = [];

		const n = 11;

		for (let i = 0; i < n; ++i) v[i] = g.vadd(i);

		e[1] = [];
		e[1][0] = g.eadd(v[1], v[9]);
		e[0] = [];
		e[0][0] = g.eadd(v[0], v[10]);
		e[0][1] = g.eadd(v[0], v[5]);
		e[0][2] = g.eadd(v[0], v[3]);
		e[0][3] = g.eadd(v[0], v[1]);
		e[0][4] = g.eadd(v[0], v[0]);
		e[1][1] = e[0][3];
		e[4] = [];
		e[4][0] = g.eadd(v[4], v[7]);

		const r = [0, 1, 4];

		// Tests

		let k;
		let notseen;
		let alledges;

		k = 0;
		notseen = set(v);

		exhaust(
			map((j) => {
				t.true(notseen.has(j), 'vitr ' + k);
				notseen.remove(j);
				++k;
			}, g.vitr()),
		);

		k = 0;
		alledges = e[0].concat([e[1][0]]).concat(e[4]);
		notseen = set(alledges);

		exhaust(
			map((j) => {
				t.true(notseen.has(j), 'eitr ' + k);
				notseen.remove(j);
				++k;
			}, g.eitr()),
		);

		t.is(k, alledges.length, 'check edges count before del');

		for (const m of r) {
			k = e[m].length;

			notseen = set(e[m]);

			exhaust(
				map((x) => {
					--k;
					t.true(notseen.has(x), 'iitr ' + m + ' ' + k);
					notseen.remove(x);
				}, g.iitr(v[m])),
			);
		}

		// Delete edges 1 0 , 0 2 , 4 0
		g.edel(e[1].splice(0, 1)[0]);

		g.edel(e[0].splice(2, 1)[0]);

		g.edel(e[4].splice(0, 1)[0]);

		k = 0;
		alledges = e[0].concat(e[4]);
		notseen = set(alledges);

		exhaust(
			map((j) => {
				t.true(notseen.has(j), 'eitr ' + k);
				notseen.remove(j);
				++k;
			}, g.eitr()),
		);

		t.is(k, alledges.length, 'check edges count after del');

		k = 0;
		notseen = set(map((e) => g.endpoints(e)[1], e[0]));

		exhaust(
			map((j) => {
				t.true(notseen.has(j), 'nitr ' + k);
				notseen.remove(j);
				++k;
			}, g.nitr(v[0])),
		);

		t.is(k, e[0].length, 'check neighbour count after del');

		for (const m of r) {
			k = e[m].length;

			notseen = set(e[m]);

			exhaust(
				map((x) => {
					--k;
					t.true(notseen.has(x), 'iitr ' + m + ' ' + k);
					notseen.remove(x);
				}, g.iitr(v[m])),
			);
		}

		// Delete vertex 10

		g.vdel(v.splice(10, 1)[0]);
		e[0].splice(0, 1);

		k = 0;
		notseen = set(v);

		exhaust(
			map((j) => {
				t.true(notseen.has(j), 'vitr ' + k);
				notseen.remove(j);
				++k;
			}, g.vitr()),
		);

		t.is(k, v.length, 'check vertex count after del');

		e[0].splice(1, 1);

		// Delete remaining edges
		for (const m of r) {
			while (e[m].length > 0) g.edel(e[m].splice(0, 1)[0]);
		}

		t.true(isEmpty(g.eitr()), 'no more edges');

		t.true(
			all(map((i) => isEmpty(g.iitr(i)), g.vitr())),
			'no more incident edges',
		);

		// Delete remaining vertices
		while (v.length > 0) g.vdel(v.splice(0, 1)[0]);

		t.true(isEmpty(g.vitr()), 'no more vertices');
	});

	test('graph-spec : Graph extensive test > ' + title, (t) => {
		const G = new Constructor();

		const n = 10;

		let V;
		let E;

		const init = () => {
			const V = list(map((i) => G.vadd(i), range(n)));
			t.true(set(G.vitr()).isequal(G.vertices()));

			const E = [
				G.eadd(V[0], V[1]),
				G.eadd(V[0], V[2]),
				G.eadd(V[0], V[3]),

				G.eadd(V[4], V[1]),
				G.eadd(V[4], V[2]),
				G.eadd(V[4], V[3]),

				G.eadd(V[5], V[6]),
				G.eadd(V[5], V[7]),
				G.eadd(V[5], V[8]),

				G.eadd(V[9], V[6]),
				G.eadd(V[9], V[7]),
				G.eadd(V[9], V[8]),

				G.eadd(V[0], V[1]),
				G.eadd(V[0], V[2]),
				G.eadd(V[0], V[3]),
			];

			return [V, E];
		};

		const delete_all_edges = () => exhaust(map(G.edel.bind(G), E));
		const delete_all_vertices = () => exhaust(map(G.vdel.bind(G), V));

		[V, E] = init();

		t.is(len(G.vitr()), 10);
		t.is(len(G.eitr()), 12);

		delete_all_edges();

		t.is(len(G.vitr()), 10);
		t.true(isEmpty(G.eitr()));

		delete_all_vertices();

		t.true(isEmpty(G.vitr()));
		t.true(isEmpty(G.eitr()));

		[V, E] = init();

		t.is(len(G.vitr()), 10);
		t.is(len(G.eitr()), 12);

		delete_all_vertices();

		t.true(isEmpty(G.vitr()));
		t.true(isEmpty(G.eitr()));

		[V, E] = init();

		t.is(len(G.iitr(V[0])), 3);
		t.is(len(G.iitr(V[1])), 2);
		t.is(len(G.iitr(V[2])), 2);
		t.is(len(G.iitr(V[3])), 2);
		t.is(len(G.iitr(V[4])), 3);
		t.is(len(G.iitr(V[5])), 3);
		t.is(len(G.iitr(V[6])), 2);
		t.is(len(G.iitr(V[7])), 2);
		t.is(len(G.iitr(V[8])), 2);
		t.is(len(G.iitr(V[9])), 3);

		t.is(len(G.initr(V[0])), 3);
		t.is(len(G.initr(V[1])), 2);
		t.is(len(G.initr(V[2])), 2);
		t.is(len(G.initr(V[3])), 2);
		t.is(len(G.initr(V[4])), 3);
		t.is(len(G.initr(V[5])), 3);
		t.is(len(G.initr(V[6])), 2);
		t.is(len(G.initr(V[7])), 2);
		t.is(len(G.initr(V[8])), 2);
		t.is(len(G.initr(V[9])), 3);

		t.is(len(G.outitr(V[0])), 3);
		t.is(len(G.outitr(V[1])), 2);
		t.is(len(G.outitr(V[2])), 2);
		t.is(len(G.outitr(V[3])), 2);
		t.is(len(G.outitr(V[4])), 3);
		t.is(len(G.outitr(V[5])), 3);
		t.is(len(G.outitr(V[6])), 2);
		t.is(len(G.outitr(V[7])), 2);
		t.is(len(G.outitr(V[8])), 2);
		t.is(len(G.outitr(V[9])), 3);

		G.reverse();

		t.is(len(G.iitr(V[0])), 3);
		t.is(len(G.iitr(V[1])), 2);
		t.is(len(G.iitr(V[2])), 2);
		t.is(len(G.iitr(V[3])), 2);
		t.is(len(G.iitr(V[4])), 3);
		t.is(len(G.iitr(V[5])), 3);
		t.is(len(G.iitr(V[6])), 2);
		t.is(len(G.iitr(V[7])), 2);
		t.is(len(G.iitr(V[8])), 2);
		t.is(len(G.iitr(V[9])), 3);

		t.is(len(G.outitr(V[0])), 3);
		t.is(len(G.outitr(V[1])), 2);
		t.is(len(G.outitr(V[2])), 2);
		t.is(len(G.outitr(V[3])), 2);
		t.is(len(G.outitr(V[4])), 3);
		t.is(len(G.outitr(V[5])), 3);
		t.is(len(G.outitr(V[6])), 2);
		t.is(len(G.outitr(V[7])), 2);
		t.is(len(G.outitr(V[8])), 2);
		t.is(len(G.outitr(V[9])), 3);

		t.is(len(G.initr(V[0])), 3);
		t.is(len(G.initr(V[1])), 2);
		t.is(len(G.initr(V[2])), 2);
		t.is(len(G.initr(V[3])), 2);
		t.is(len(G.initr(V[4])), 3);
		t.is(len(G.initr(V[5])), 3);
		t.is(len(G.initr(V[6])), 2);
		t.is(len(G.initr(V[7])), 2);
		t.is(len(G.initr(V[8])), 2);
		t.is(len(G.initr(V[9])), 3);

		t.true(set(G.nitr(V[0])).isequal([V[1], V[2], V[3]]));
		t.true(set(G.nitr(V[1])).isequal([V[0], V[4]]));
		t.true(set(G.nitr(V[2])).isequal([V[0], V[4]]));
		t.true(set(G.nitr(V[3])).isequal([V[0], V[4]]));
		t.true(set(G.nitr(V[4])).isequal([V[1], V[2], V[3]]));
		t.true(set(G.nitr(V[5])).isequal([V[6], V[7], V[8]]));
		t.true(set(G.nitr(V[6])).isequal([V[5], V[9]]));
		t.true(set(G.nitr(V[7])).isequal([V[5], V[9]]));
		t.true(set(G.nitr(V[8])).isequal([V[5], V[9]]));
		t.true(set(G.nitr(V[9])).isequal([V[6], V[7], V[8]]));

		t.true(set(G.dsitr(V[0])).isequal([V[1], V[2], V[3]]));
		t.true(set(G.dsitr(V[1])).isequal([V[0], V[4]]));
		t.true(set(G.dsitr(V[2])).isequal([V[0], V[4]]));
		t.true(set(G.dsitr(V[3])).isequal([V[0], V[4]]));
		t.true(set(G.dsitr(V[4])).isequal([V[1], V[2], V[3]]));
		t.true(set(G.dsitr(V[5])).isequal([V[6], V[7], V[8]]));
		t.true(set(G.dsitr(V[6])).isequal([V[5], V[9]]));
		t.true(set(G.dsitr(V[7])).isequal([V[5], V[9]]));
		t.true(set(G.dsitr(V[8])).isequal([V[5], V[9]]));
		t.true(set(G.dsitr(V[9])).isequal([V[6], V[7], V[8]]));

		t.true(set(G.dpitr(V[0])).isequal([V[1], V[2], V[3]]));
		t.true(set(G.dpitr(V[1])).isequal([V[0], V[4]]));
		t.true(set(G.dpitr(V[2])).isequal([V[0], V[4]]));
		t.true(set(G.dpitr(V[3])).isequal([V[0], V[4]]));
		t.true(set(G.dpitr(V[4])).isequal([V[1], V[2], V[3]]));
		t.true(set(G.dpitr(V[5])).isequal([V[6], V[7], V[8]]));
		t.true(set(G.dpitr(V[6])).isequal([V[5], V[9]]));
		t.true(set(G.dpitr(V[7])).isequal([V[5], V[9]]));
		t.true(set(G.dpitr(V[8])).isequal([V[5], V[9]]));
		t.true(set(G.dpitr(V[9])).isequal([V[6], V[7], V[8]]));

		t.is(len(G.edges()), 12, 'G.edges( ) length');

		const edges = set(E);

		for (const [u, v, e] of G.edges()) {
			t.true(edges.has(e));

			t.true(set([u, v]).isequal(G.endpoints(e)));

			edges.remove(e);
		}

		for (const i of range(n)) {
			t.true(all(map(([u, v]) => u === V[i] || v === V[i], G.incident(V[i]))));

			t.true(
				set(map(([_u, _v, e]) => e, G.incident(V[i]))).isequal(
					chain(
						map(([_u, _v, e]) => e, G.ingoing(V[i])),
						map(([_u, _v, e]) => e, G.outgoing(V[i])),
					),
				),
			);

			t.true(
				set(
					chain(
						map(([, v]) => v, G.incident(V[i])),
						map(([u]) => u, G.incident(V[i])),
					),
				).isequal(
					chain(
						[V[i]],
						map(([u]) => u, G.ingoing(V[i])),
						map(([, v]) => v, G.outgoing(V[i])),
					),
				),
			);

			t.true(
				set(G.nitr(V[i])).isequal(
					map(([u, v]) => (u === V[i] ? v : u), G.incident(V[i])),
				),
			);
			t.true(set(G.dpitr(V[i])).isequal(map(([u]) => u, G.ingoing(V[i]))));
			t.true(set(G.dsitr(V[i])).isequal(map(([, v]) => v, G.outgoing(V[i]))));
		}

		delete_all_edges();

		t.is(len(G.vitr()), 10);
		t.true(isEmpty(G.eitr()));

		delete_all_vertices();

		t.true(isEmpty(G.vitr()));
		t.true(isEmpty(G.eitr()));
	});
}
