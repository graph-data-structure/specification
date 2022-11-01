import {
	exhaust as ex,
	chain,
	all,
	map,
	range,
	list,
} from '@aureooms/js-itertools';
import {len} from '@aureooms/js-cardinality';
import {set} from '@aureooms/js-collections';

import methods from './methods.js';

export default function multiGraph(test, title, Constructor) {
	methods(test, title, Constructor);

	test('graph-spec : MultiGraph simple test > ' + title, function (t) {
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
		t.deepEqual(len(G.eitr()), 2);

		G.edel(uv);
		t.deepEqual(len(G.eitr()), 1);

		t.is(G.eitr().next().value, vu);

		G.edel(vu);
		t.deepEqual(len(G.eitr()), 0);

		G.vdel(u);
		G.vdel(v);
		t.deepEqual(len(G.vitr()), 0);
	});

	test('graph-spec : MultiGraph extensive test > ' + title, function (t) {
		const G = new Constructor();

		const n = 10;

		let V;
		let E;

		const init = function () {
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

		const delete_all_edges = () => ex(map(G.edel.bind(G), E));
		const delete_all_vertices = () => ex(map(G.vdel.bind(G), V));

		[V, E] = init();

		t.deepEqual(len(G.vitr()), 10);
		t.deepEqual(len(G.eitr()), 15);

		delete_all_edges();

		t.deepEqual(len(G.vitr()), 10);
		t.deepEqual(len(G.eitr()), 0);

		delete_all_vertices();

		t.deepEqual(len(G.vitr()), 0);
		t.deepEqual(len(G.eitr()), 0);

		[V, E] = init();

		t.deepEqual(len(G.vitr()), 10);
		t.deepEqual(len(G.eitr()), 15);

		delete_all_vertices();

		t.deepEqual(len(G.vitr()), 0);
		t.deepEqual(len(G.eitr()), 0);

		[V, E] = init();

		t.deepEqual(len(G.iitr(V[0])), 6);
		t.deepEqual(len(G.iitr(V[1])), 3);
		t.deepEqual(len(G.iitr(V[2])), 3);
		t.deepEqual(len(G.iitr(V[3])), 3);
		t.deepEqual(len(G.iitr(V[4])), 3);
		t.deepEqual(len(G.iitr(V[5])), 3);
		t.deepEqual(len(G.iitr(V[6])), 2);
		t.deepEqual(len(G.iitr(V[7])), 2);
		t.deepEqual(len(G.iitr(V[8])), 2);
		t.deepEqual(len(G.iitr(V[9])), 3);

		t.deepEqual(len(G.initr(V[0])), 6);
		t.deepEqual(len(G.initr(V[1])), 3);
		t.deepEqual(len(G.initr(V[2])), 3);
		t.deepEqual(len(G.initr(V[3])), 3);
		t.deepEqual(len(G.initr(V[4])), 3);
		t.deepEqual(len(G.initr(V[5])), 3);
		t.deepEqual(len(G.initr(V[6])), 2);
		t.deepEqual(len(G.initr(V[7])), 2);
		t.deepEqual(len(G.initr(V[8])), 2);
		t.deepEqual(len(G.initr(V[9])), 3);

		t.deepEqual(len(G.outitr(V[0])), 6);
		t.deepEqual(len(G.outitr(V[1])), 3);
		t.deepEqual(len(G.outitr(V[2])), 3);
		t.deepEqual(len(G.outitr(V[3])), 3);
		t.deepEqual(len(G.outitr(V[4])), 3);
		t.deepEqual(len(G.outitr(V[5])), 3);
		t.deepEqual(len(G.outitr(V[6])), 2);
		t.deepEqual(len(G.outitr(V[7])), 2);
		t.deepEqual(len(G.outitr(V[8])), 2);
		t.deepEqual(len(G.outitr(V[9])), 3);

		G.reverse();

		t.deepEqual(len(G.iitr(V[0])), 6);
		t.deepEqual(len(G.iitr(V[1])), 3);
		t.deepEqual(len(G.iitr(V[2])), 3);
		t.deepEqual(len(G.iitr(V[3])), 3);
		t.deepEqual(len(G.iitr(V[4])), 3);
		t.deepEqual(len(G.iitr(V[5])), 3);
		t.deepEqual(len(G.iitr(V[6])), 2);
		t.deepEqual(len(G.iitr(V[7])), 2);
		t.deepEqual(len(G.iitr(V[8])), 2);
		t.deepEqual(len(G.iitr(V[9])), 3);

		t.deepEqual(len(G.outitr(V[0])), 6);
		t.deepEqual(len(G.outitr(V[1])), 3);
		t.deepEqual(len(G.outitr(V[2])), 3);
		t.deepEqual(len(G.outitr(V[3])), 3);
		t.deepEqual(len(G.outitr(V[4])), 3);
		t.deepEqual(len(G.outitr(V[5])), 3);
		t.deepEqual(len(G.outitr(V[6])), 2);
		t.deepEqual(len(G.outitr(V[7])), 2);
		t.deepEqual(len(G.outitr(V[8])), 2);
		t.deepEqual(len(G.outitr(V[9])), 3);

		t.deepEqual(len(G.initr(V[0])), 6);
		t.deepEqual(len(G.initr(V[1])), 3);
		t.deepEqual(len(G.initr(V[2])), 3);
		t.deepEqual(len(G.initr(V[3])), 3);
		t.deepEqual(len(G.initr(V[4])), 3);
		t.deepEqual(len(G.initr(V[5])), 3);
		t.deepEqual(len(G.initr(V[6])), 2);
		t.deepEqual(len(G.initr(V[7])), 2);
		t.deepEqual(len(G.initr(V[8])), 2);
		t.deepEqual(len(G.initr(V[9])), 3);

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

		t.deepEqual(len(G.edges()), 15, 'G.edges( ) length');

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
					chain([
						map(([_u, _v, e]) => e, G.ingoing(V[i])),
						map(([_u, _v, e]) => e, G.outgoing(V[i])),
					]),
				),
			);

			t.true(
				set(
					chain([
						map(([, v]) => v, G.incident(V[i])),
						map(([u]) => u, G.incident(V[i])),
					]),
				).isequal(
					chain([
						[V[i]],
						map(([u]) => u, G.ingoing(V[i])),
						map(([, v]) => v, G.outgoing(V[i])),
					]),
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

		t.deepEqual(len(G.vitr()), 10);
		t.deepEqual(len(G.eitr()), 0);

		delete_all_vertices();

		t.deepEqual(len(G.vitr()), 0);
		t.deepEqual(len(G.eitr()), 0);
	});
}
