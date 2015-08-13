"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

(function () {

	'use strict';

	var definition = function definition(exports, undefined) {

		/* js/src/000-dependencies.js */

		var _require = require("aureooms-js-itertools");

		var ex = _require.exhaust;
		var chain = _require.chain;
		var all = _require.all;
		var map = _require.map;
		var range = _require.range;
		var list = _require.list;
		var zip = _require.zip;

		var cardinality = require("aureooms-js-cardinality");

		var _require2 = require("aureooms-js-collections");

		var set = _require2.set;

		/* js/src/001-spec */
		/* js/src/001-spec/01-Graph.js */

		var Graph = function Graph(title, Constructor) {

			test("graph-spec : Graph #1 > " + title, function () {

				var g = new Constructor();

				var v = [];
				var e = [];

				var n = 11;

				for (var i = 0; i < n; ++i) v[i] = g.vadd(i);

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

				var r = [0, 1, 4];

				// tests

				var k, set, alledges;

				k = 0;
				set = new Set(v);

				ex(map(function (j) {
					ok(set.has(j), 'vitr ' + k);
					set["delete"](j);
					++k;
				}, g.vitr()));

				k = 0;
				alledges = e[0].concat([e[1][0]]).concat(e[4]);
				set = new Set(alledges);

				ex(map(function (j) {
					ok(set.has(j), 'eitr ' + k);
					set["delete"](j);
					++k;
				}, g.eitr()));

				deepEqual(k, alledges.length, 'check edges count before del');

				r.forEach(function (m) {

					var k = e[m].length;

					var set = new Set(e[m]);

					ex(map(function (x) {
						--k;
						ok(set.has(x), 'iitr ' + m + ' ' + k);
						set["delete"](x);
					}, g.iitr(v[m])));
				});

				// delete edges 1 0 , 0 2 , 4 0
				g.edel(e[1].splice(0, 1)[0]);

				g.edel(e[0].splice(2, 1)[0]);

				g.edel(e[4].splice(0, 1)[0]);

				k = 0;
				alledges = e[0].concat(e[4]);
				set = new Set(alledges);

				ex(map(function (j) {
					ok(set.has(j), 'eitr ' + k);
					set["delete"](j);
					++k;
				}, g.eitr()));

				deepEqual(k, alledges.length, 'check edges count after del');

				k = 0;
				set = new Set(map(function (e) {
					var _g$endpoints = g.endpoints(e);

					var _g$endpoints2 = _slicedToArray(_g$endpoints, 2);

					var u = _g$endpoints2[0];
					var w = _g$endpoints2[1];

					return u === v[0] ? w : u;
				}, e[0]));

				ex(map(function (j) {
					ok(set.has(j), 'nitr ' + k);
					set["delete"](j);
					++k;
				}, g.nitr(v[0])));

				deepEqual(k, e[0].length, 'check neighbour count after del');

				r.forEach(function (m) {

					var k = e[m].length;

					var set = new Set(e[m]);

					ex(map(function (x) {
						--k;
						ok(set.has(x), 'iitr ' + m + ' ' + k);
						set["delete"](x);
					}, g.iitr(v[m])));
				});

				// delete vertex 3

				g.vdel(v.splice(3, 1)[0]);

				k = 0;
				set = new Set(v);

				ex(map(function (j) {
					ok(set.has(j), 'vitr ' + k);
					set["delete"](j);
					++k;
				}, g.vitr()));

				deepEqual(k, v.length, 'check vertex count after del');

				e[0].splice(2, 1);

				// delete remaining edges
				r.forEach(function (m) {
					while (e[m].length) g.edel(e[m].splice(0, 1)[0]);
				});

				ok(cardinality.empty(g.eitr()), "no more edges");

				ok(all((function () {
					var _all = [];
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = g.vitr()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var _i = _step.value;

							_all.push(cardinality.empty(g.iitr(_i)));
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}

					return _all;
				})()), "no more incident edges");

				// delete remaining vertices
				while (v.length) g.vdel(v.splice(0, 1)[0]);

				ok(cardinality.empty(g.vitr()), "no more vertices");
			});

			test("graph-spec : Graph #2 > " + title, function () {

				var g = new Constructor();

				var v = [];
				var e = [];

				var n = 11;

				for (var i = 0; i < n; ++i) v[i] = g.vadd(i);

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

				var r = [0, 1, 4];

				// tests

				var k, set, alledges;

				k = 0;
				set = new Set(v);

				ex(map(function (j) {
					ok(set.has(j), 'vitr ' + k);
					set["delete"](j);
					++k;
				}, g.vitr()));

				k = 0;
				alledges = e[0].concat([e[1][0]]).concat(e[4]);
				set = new Set(alledges);

				ex(map(function (j) {
					ok(set.has(j), 'eitr ' + k);
					set["delete"](j);
					++k;
				}, g.eitr()));

				deepEqual(k, alledges.length, 'check edges count before del');

				r.forEach(function (m) {

					var k = e[m].length;

					var set = new Set(e[m]);

					ex(map(function (x) {
						--k;
						ok(set.has(x), 'iitr ' + m + ' ' + k);
						set["delete"](x);
					}, g.iitr(v[m])));
				});

				// delete edges 1 0 , 0 2 , 4 0
				g.edel(e[1].splice(0, 1)[0]);

				g.edel(e[0].splice(2, 1)[0]);

				g.edel(e[4].splice(0, 1)[0]);

				k = 0;
				alledges = e[0].concat(e[4]);
				set = new Set(alledges);

				ex(map(function (j) {
					ok(set.has(j), 'eitr ' + k);
					set["delete"](j);
					++k;
				}, g.eitr()));

				deepEqual(k, alledges.length, 'check edges count after del');

				k = 0;
				set = new Set(map(function (e) {
					var _g$endpoints3 = g.endpoints(e);

					var _g$endpoints32 = _slicedToArray(_g$endpoints3, 2);

					var u = _g$endpoints32[0];
					var w = _g$endpoints32[1];

					return u === v[0] ? w : u;
				}, e[0]));

				ex(map(function (j) {
					ok(set.has(j), 'nitr ' + k);
					set["delete"](j);
					++k;
				}, g.nitr(v[0])));

				deepEqual(k, e[0].length, 'check neighbour count after del');

				r.forEach(function (m) {

					var k = e[m].length;

					var set = new Set(e[m]);

					ex(map(function (x) {
						--k;
						ok(set.has(x), 'iitr ' + m + ' ' + k);
						set["delete"](x);
					}, g.iitr(v[m])));
				});

				// delete vertex 10

				g.vdel(v.splice(10, 1)[0]);
				e[0].splice(0, 1);

				k = 0;
				set = new Set(v);

				ex(map(function (j) {
					ok(set.has(j), 'vitr ' + k);
					set["delete"](j);
					++k;
				}, g.vitr()));

				deepEqual(k, v.length, 'check vertex count after del');

				e[0].splice(1, 1);

				// delete remaining edges
				r.forEach(function (m) {
					while (e[m].length) g.edel(e[m].splice(0, 1)[0]);
				});

				ok(cardinality.empty(g.eitr()), "no more edges");

				ok(all((function () {
					var _all2 = [];
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = g.vitr()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var _i2 = _step2.value;

							_all2.push(cardinality.empty(g.iitr(_i2)));
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
								_iterator2["return"]();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}

					return _all2;
				})()), "no more incident edges");

				// delete remaining vertices
				while (v.length) g.vdel(v.splice(0, 1)[0]);

				ok(cardinality.empty(g.vitr()), "no more vertices");
			});
		};

		exports.Graph = Graph;

		/* js/src/001-spec/02-MultiGraph.js */

		var MultiGraph = Graph;

		exports.MultiGraph = MultiGraph;

		/* js/src/001-spec/03-MultiDiGraph.js */

		var MultiDiGraph = function MultiDiGraph(title, Constructor) {

			test("graph-spec : MultiDiGraph simple test > " + title, function (assert) {

				var G = new Constructor();

				var u = G.vadd();
				var v = G.vadd();

				var uv = G.eadd(u, v);

				assert.ok(set([u, v]).isequal(G.vitr()));

				var _G$edges$next$value = _slicedToArray(G.edges().next().value, 2);

				var a = _G$edges$next$value[0];
				var b = _G$edges$next$value[1];

				assert.deepEqual([a, b], [u, v]);

				G.reverse();

				assert.ok(set([u, v]).isequal(G.vitr()));

				var _G$edges$next$value2 = _slicedToArray(G.edges().next().value, 2);

				a = _G$edges$next$value2[0];
				b = _G$edges$next$value2[1];

				assert.deepEqual([a, b], [v, u]);

				G.edel(uv);
				assert.deepEqual(cardinality.len(G.eitr()), 0);

				G.vdel(u);
				G.vdel(v);
				assert.deepEqual(cardinality.len(G.vitr()), 0);
			});

			test("graph-spec : MultiDiGraph extensive test > " + title, function () {

				var G = new Constructor();

				var n = 10;

				var V = undefined,
				    E = undefined;

				var init = function init() {

					var V = (function () {
						var _V = [];
						var _iteratorNormalCompletion3 = true;
						var _didIteratorError3 = false;
						var _iteratorError3 = undefined;

						try {
							for (var _iterator3 = range(n)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
								var i = _step3.value;

								_V.push(G.vadd(i));
							}
						} catch (err) {
							_didIteratorError3 = true;
							_iteratorError3 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
									_iterator3["return"]();
								}
							} finally {
								if (_didIteratorError3) {
									throw _iteratorError3;
								}
							}
						}

						return _V;
					})();

					var E = [G.eadd(V[0], V[1]), G.eadd(V[0], V[2]), G.eadd(V[0], V[3]), G.eadd(V[4], V[1]), G.eadd(V[4], V[2]), G.eadd(V[4], V[3]), G.eadd(V[5], V[6]), G.eadd(V[5], V[7]), G.eadd(V[5], V[8]), G.eadd(V[9], V[6]), G.eadd(V[9], V[7]), G.eadd(V[9], V[8]), G.eadd(V[0], V[1]), G.eadd(V[0], V[2]), G.eadd(V[0], V[3])];

					return [V, E];
				};

				var delete_all_edges = function delete_all_edges() {
					return ex(map(G.edel.bind(G), E));
				};
				var delete_all_vertices = function delete_all_vertices() {
					return ex(map(G.vdel.bind(G), V));
				};

				var _init = init();

				var _init2 = _slicedToArray(_init, 2);

				V = _init2[0];
				E = _init2[1];

				deepEqual(cardinality.len(G.vitr()), 10);
				deepEqual(cardinality.len(G.eitr()), 15);

				delete_all_edges();

				deepEqual(cardinality.len(G.vitr()), 10);
				deepEqual(cardinality.len(G.eitr()), 0);

				delete_all_vertices();

				deepEqual(cardinality.len(G.vitr()), 0);
				deepEqual(cardinality.len(G.eitr()), 0);

				var _init3 = init();

				var _init32 = _slicedToArray(_init3, 2);

				V = _init32[0];
				E = _init32[1];

				deepEqual(cardinality.len(G.vitr()), 10);
				deepEqual(cardinality.len(G.eitr()), 15);

				delete_all_vertices();

				deepEqual(cardinality.len(G.vitr()), 0);
				deepEqual(cardinality.len(G.eitr()), 0);

				var _init4 = init();

				var _init42 = _slicedToArray(_init4, 2);

				V = _init42[0];
				E = _init42[1];

				deepEqual(cardinality.len(G.iitr(V[0])), 6);
				deepEqual(cardinality.len(G.iitr(V[1])), 3);
				deepEqual(cardinality.len(G.iitr(V[2])), 3);
				deepEqual(cardinality.len(G.iitr(V[3])), 3);
				deepEqual(cardinality.len(G.iitr(V[4])), 3);
				deepEqual(cardinality.len(G.iitr(V[5])), 3);
				deepEqual(cardinality.len(G.iitr(V[6])), 2);
				deepEqual(cardinality.len(G.iitr(V[7])), 2);
				deepEqual(cardinality.len(G.iitr(V[8])), 2);
				deepEqual(cardinality.len(G.iitr(V[9])), 3);

				deepEqual(cardinality.len(G.initr(V[0])), 0);
				deepEqual(cardinality.len(G.initr(V[1])), 3);
				deepEqual(cardinality.len(G.initr(V[2])), 3);
				deepEqual(cardinality.len(G.initr(V[3])), 3);
				deepEqual(cardinality.len(G.initr(V[4])), 0);
				deepEqual(cardinality.len(G.initr(V[5])), 0);
				deepEqual(cardinality.len(G.initr(V[6])), 2);
				deepEqual(cardinality.len(G.initr(V[7])), 2);
				deepEqual(cardinality.len(G.initr(V[8])), 2);
				deepEqual(cardinality.len(G.initr(V[9])), 0);

				deepEqual(cardinality.len(G.outitr(V[0])), 6);
				deepEqual(cardinality.len(G.outitr(V[1])), 0);
				deepEqual(cardinality.len(G.outitr(V[2])), 0);
				deepEqual(cardinality.len(G.outitr(V[3])), 0);
				deepEqual(cardinality.len(G.outitr(V[4])), 3);
				deepEqual(cardinality.len(G.outitr(V[5])), 3);
				deepEqual(cardinality.len(G.outitr(V[6])), 0);
				deepEqual(cardinality.len(G.outitr(V[7])), 0);
				deepEqual(cardinality.len(G.outitr(V[8])), 0);
				deepEqual(cardinality.len(G.outitr(V[9])), 3);

				G.reverse();

				deepEqual(cardinality.len(G.iitr(V[0])), 6);
				deepEqual(cardinality.len(G.iitr(V[1])), 3);
				deepEqual(cardinality.len(G.iitr(V[2])), 3);
				deepEqual(cardinality.len(G.iitr(V[3])), 3);
				deepEqual(cardinality.len(G.iitr(V[4])), 3);
				deepEqual(cardinality.len(G.iitr(V[5])), 3);
				deepEqual(cardinality.len(G.iitr(V[6])), 2);
				deepEqual(cardinality.len(G.iitr(V[7])), 2);
				deepEqual(cardinality.len(G.iitr(V[8])), 2);
				deepEqual(cardinality.len(G.iitr(V[9])), 3);

				deepEqual(cardinality.len(G.outitr(V[0])), 0);
				deepEqual(cardinality.len(G.outitr(V[1])), 3);
				deepEqual(cardinality.len(G.outitr(V[2])), 3);
				deepEqual(cardinality.len(G.outitr(V[3])), 3);
				deepEqual(cardinality.len(G.outitr(V[4])), 0);
				deepEqual(cardinality.len(G.outitr(V[5])), 0);
				deepEqual(cardinality.len(G.outitr(V[6])), 2);
				deepEqual(cardinality.len(G.outitr(V[7])), 2);
				deepEqual(cardinality.len(G.outitr(V[8])), 2);
				deepEqual(cardinality.len(G.outitr(V[9])), 0);

				deepEqual(cardinality.len(G.initr(V[0])), 6);
				deepEqual(cardinality.len(G.initr(V[1])), 0);
				deepEqual(cardinality.len(G.initr(V[2])), 0);
				deepEqual(cardinality.len(G.initr(V[3])), 0);
				deepEqual(cardinality.len(G.initr(V[4])), 3);
				deepEqual(cardinality.len(G.initr(V[5])), 3);
				deepEqual(cardinality.len(G.initr(V[6])), 0);
				deepEqual(cardinality.len(G.initr(V[7])), 0);
				deepEqual(cardinality.len(G.initr(V[8])), 0);
				deepEqual(cardinality.len(G.initr(V[9])), 3);

				ok(set(G.nitr(V[0])).isequal([V[1], V[2], V[3]]));
				ok(set(G.nitr(V[1])).isequal([V[0], V[4]]));
				ok(set(G.nitr(V[2])).isequal([V[0], V[4]]));
				ok(set(G.nitr(V[3])).isequal([V[0], V[4]]));
				ok(set(G.nitr(V[4])).isequal([V[1], V[2], V[3]]));
				ok(set(G.nitr(V[5])).isequal([V[6], V[7], V[8]]));
				ok(set(G.nitr(V[6])).isequal([V[5], V[9]]));
				ok(set(G.nitr(V[7])).isequal([V[5], V[9]]));
				ok(set(G.nitr(V[8])).isequal([V[5], V[9]]));
				ok(set(G.nitr(V[9])).isequal([V[6], V[7], V[8]]));

				ok(set(G.dsitr(V[0])).isequal([]));
				ok(set(G.dsitr(V[1])).isequal([V[0], V[4]]));
				ok(set(G.dsitr(V[2])).isequal([V[0], V[4]]));
				ok(set(G.dsitr(V[3])).isequal([V[0], V[4]]));
				ok(set(G.dsitr(V[4])).isequal([]));
				ok(set(G.dsitr(V[5])).isequal([]));
				ok(set(G.dsitr(V[6])).isequal([V[5], V[9]]));
				ok(set(G.dsitr(V[7])).isequal([V[5], V[9]]));
				ok(set(G.dsitr(V[8])).isequal([V[5], V[9]]));
				ok(set(G.dsitr(V[9])).isequal([]));

				ok(set(G.dpitr(V[0])).isequal([V[1], V[2], V[3]]));
				ok(set(G.dpitr(V[1])).isequal([]));
				ok(set(G.dpitr(V[2])).isequal([]));
				ok(set(G.dpitr(V[3])).isequal([]));
				ok(set(G.dpitr(V[4])).isequal([V[1], V[2], V[3]]));
				ok(set(G.dpitr(V[5])).isequal([V[6], V[7], V[8]]));
				ok(set(G.dpitr(V[6])).isequal([]));
				ok(set(G.dpitr(V[7])).isequal([]));
				ok(set(G.dpitr(V[8])).isequal([]));
				ok(set(G.dpitr(V[9])).isequal([V[6], V[7], V[8]]));

				deepEqual(cardinality.len(G.edges()), 15, "G.edges( ) length");

				var edges = set(E);

				var seen = set();

				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = G.edges()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var _step4$value = _slicedToArray(_step4.value, 3);

						var u = _step4$value[0];
						var v = _step4$value[1];
						var e = _step4$value[2];

						if (seen.has(e)) continue;

						ok(edges.has(e));

						deepEqual([u, v], G.endpoints(e));

						edges.remove(e);

						seen.add(e);
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
							_iterator4["return"]();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}

				var _iteratorNormalCompletion5 = true;
				var _didIteratorError5 = false;
				var _iteratorError5 = undefined;

				try {
					var _loop = function () {
						var i = _step5.value;

						ok(all((function () {
							var _all3 = [];
							var _iteratorNormalCompletion6 = true;
							var _didIteratorError6 = false;
							var _iteratorError6 = undefined;

							try {
								for (var _iterator6 = G.incident(V[i])[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
									var _step6$value = _slicedToArray(_step6.value, 2);

									var u = _step6$value[0];
									var v = _step6$value[1];

									_all3.push(u === V[i] || v === V[i]);
								}
							} catch (err) {
								_didIteratorError6 = true;
								_iteratorError6 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
										_iterator6["return"]();
									}
								} finally {
									if (_didIteratorError6) {
										throw _iteratorError6;
									}
								}
							}

							return _all3;
						})()));

						ok(set((function () {
							var _set = [];
							var _iteratorNormalCompletion7 = true;
							var _didIteratorError7 = false;
							var _iteratorError7 = undefined;

							try {
								for (var _iterator7 = G.incident(V[i])[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
									var _step7$value = _slicedToArray(_step7.value, 3);

									var u = _step7$value[0];
									var v = _step7$value[1];
									var e = _step7$value[2];

									_set.push(e);
								}
							} catch (err) {
								_didIteratorError7 = true;
								_iteratorError7 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion7 && _iterator7["return"]) {
										_iterator7["return"]();
									}
								} finally {
									if (_didIteratorError7) {
										throw _iteratorError7;
									}
								}
							}

							return _set;
						})()).isequal(chain([(function () {
							var _ref = [];
							var _iteratorNormalCompletion8 = true;
							var _didIteratorError8 = false;
							var _iteratorError8 = undefined;

							try {
								for (var _iterator8 = G.ingoing(V[i])[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
									var _step8$value = _slicedToArray(_step8.value, 3);

									var u = _step8$value[0];
									var v = _step8$value[1];
									var e = _step8$value[2];

									_ref.push(e);
								}
							} catch (err) {
								_didIteratorError8 = true;
								_iteratorError8 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion8 && _iterator8["return"]) {
										_iterator8["return"]();
									}
								} finally {
									if (_didIteratorError8) {
										throw _iteratorError8;
									}
								}
							}

							return _ref;
						})(), (function () {
							var _ref2 = [];
							var _iteratorNormalCompletion9 = true;
							var _didIteratorError9 = false;
							var _iteratorError9 = undefined;

							try {
								for (var _iterator9 = G.outgoing(V[i])[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
									var _step9$value = _slicedToArray(_step9.value, 3);

									var u = _step9$value[0];
									var v = _step9$value[1];
									var e = _step9$value[2];

									_ref2.push(e);
								}
							} catch (err) {
								_didIteratorError9 = true;
								_iteratorError9 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion9 && _iterator9["return"]) {
										_iterator9["return"]();
									}
								} finally {
									if (_didIteratorError9) {
										throw _iteratorError9;
									}
								}
							}

							return _ref2;
						})()])));

						ok(set((function () {
							var _set2 = [];
							var _iteratorNormalCompletion10 = true;
							var _didIteratorError10 = false;
							var _iteratorError10 = undefined;

							try {
								for (var _iterator10 = G.incident(V[i])[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
									var _step10$value = _slicedToArray(_step10.value, 2);

									var u = _step10$value[0];
									var v = _step10$value[1];

									_set2.push(v);
								}
							} catch (err) {
								_didIteratorError10 = true;
								_iteratorError10 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion10 && _iterator10["return"]) {
										_iterator10["return"]();
									}
								} finally {
									if (_didIteratorError10) {
										throw _iteratorError10;
									}
								}
							}

							return _set2;
						})()).isequal(chain([(function () {
							var _ref3 = [];
							var _iteratorNormalCompletion11 = true;
							var _didIteratorError11 = false;
							var _iteratorError11 = undefined;

							try {
								for (var _iterator11 = G.ingoing(V[i])[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
									var _step11$value = _slicedToArray(_step11.value, 2);

									var u = _step11$value[0];
									var v = _step11$value[1];

									_ref3.push(v);
								}
							} catch (err) {
								_didIteratorError11 = true;
								_iteratorError11 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion11 && _iterator11["return"]) {
										_iterator11["return"]();
									}
								} finally {
									if (_didIteratorError11) {
										throw _iteratorError11;
									}
								}
							}

							return _ref3;
						})(), (function () {
							var _ref4 = [];
							var _iteratorNormalCompletion12 = true;
							var _didIteratorError12 = false;
							var _iteratorError12 = undefined;

							try {
								for (var _iterator12 = G.outgoing(V[i])[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
									var _step12$value = _slicedToArray(_step12.value, 2);

									var u = _step12$value[0];
									var v = _step12$value[1];

									_ref4.push(v);
								}
							} catch (err) {
								_didIteratorError12 = true;
								_iteratorError12 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion12 && _iterator12["return"]) {
										_iterator12["return"]();
									}
								} finally {
									if (_didIteratorError12) {
										throw _iteratorError12;
									}
								}
							}

							return _ref4;
						})()])));

						ok(set((function () {
							var _set3 = [];
							var _iteratorNormalCompletion13 = true;
							var _didIteratorError13 = false;
							var _iteratorError13 = undefined;

							try {
								for (var _iterator13 = G.incident(V[i])[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
									var _step13$value = _slicedToArray(_step13.value, 1);

									var u = _step13$value[0];

									_set3.push(u);
								}
							} catch (err) {
								_didIteratorError13 = true;
								_iteratorError13 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion13 && _iterator13["return"]) {
										_iterator13["return"]();
									}
								} finally {
									if (_didIteratorError13) {
										throw _iteratorError13;
									}
								}
							}

							return _set3;
						})()).isequal(chain([(function () {
							var _ref5 = [];
							var _iteratorNormalCompletion14 = true;
							var _didIteratorError14 = false;
							var _iteratorError14 = undefined;

							try {
								for (var _iterator14 = G.ingoing(V[i])[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
									var _step14$value = _slicedToArray(_step14.value, 1);

									var u = _step14$value[0];

									_ref5.push(u);
								}
							} catch (err) {
								_didIteratorError14 = true;
								_iteratorError14 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion14 && _iterator14["return"]) {
										_iterator14["return"]();
									}
								} finally {
									if (_didIteratorError14) {
										throw _iteratorError14;
									}
								}
							}

							return _ref5;
						})(), (function () {
							var _ref6 = [];
							var _iteratorNormalCompletion15 = true;
							var _didIteratorError15 = false;
							var _iteratorError15 = undefined;

							try {
								for (var _iterator15 = G.outgoing(V[i])[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
									var _step15$value = _slicedToArray(_step15.value, 1);

									var u = _step15$value[0];

									_ref6.push(u);
								}
							} catch (err) {
								_didIteratorError15 = true;
								_iteratorError15 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion15 && _iterator15["return"]) {
										_iterator15["return"]();
									}
								} finally {
									if (_didIteratorError15) {
										throw _iteratorError15;
									}
								}
							}

							return _ref6;
						})()])));

						ok(set(G.nitr(V[i])).isequal((function () {
							var _set$isequal = [];
							var _iteratorNormalCompletion16 = true;
							var _didIteratorError16 = false;
							var _iteratorError16 = undefined;

							try {
								for (var _iterator16 = G.incident(V[i])[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
									var _step16$value = _slicedToArray(_step16.value, 2);

									var u = _step16$value[0];
									var v = _step16$value[1];

									_set$isequal.push(u === V[i] ? v : u);
								}
							} catch (err) {
								_didIteratorError16 = true;
								_iteratorError16 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion16 && _iterator16["return"]) {
										_iterator16["return"]();
									}
								} finally {
									if (_didIteratorError16) {
										throw _iteratorError16;
									}
								}
							}

							return _set$isequal;
						})()));
					};

					for (var _iterator5 = range(n)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
						_loop();
					}
				} catch (err) {
					_didIteratorError5 = true;
					_iteratorError5 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
							_iterator5["return"]();
						}
					} finally {
						if (_didIteratorError5) {
							throw _iteratorError5;
						}
					}
				}

				delete_all_edges();

				deepEqual(cardinality.len(G.vitr()), 10);
				deepEqual(cardinality.len(G.eitr()), 0);

				delete_all_vertices();

				deepEqual(cardinality.len(G.vitr()), 0);
				deepEqual(cardinality.len(G.eitr()), 0);
			});
		};

		exports.MultiDiGraph = MultiDiGraph;

		return exports;
	};
	if (typeof exports === "object") {
		definition(exports);
	} else if (typeof define === "function" && define.amd) {
		define("aureooms-js-graph-spec", [], function () {
			return definition({});
		});
	} else if (typeof window === "object" && typeof window.document === "object") {
		definition(window["graphspec"] = {});
	} else console.error("unable to detect type of module to define for aureooms-js-graph-spec");
})();