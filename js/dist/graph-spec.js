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
					return g.endpoints(e)[1];
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
					return g.endpoints(e)[1];
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

		var MultiGraph = function MultiGraph(title, Constructor) {

			test("graph-spec : MultiGraph simple test > " + title, function (assert) {

				var G = new Constructor();

				var u = G.vadd();
				var v = G.vadd();

				var uv = G.eadd(u, v);

				assert.ok(set([u, v]).isequal(G.vitr()));

				var _G$edges$next$value = _slicedToArray(G.edges().next().value, 2);

				var a = _G$edges$next$value[0];
				var b = _G$edges$next$value[1];

				assert.ok(set([a, b]).isequal([u, v]));

				G.reverse();

				assert.ok(set([u, v]).isequal(G.vitr()));
				assert.equal(G.eitr().next().value, uv);

				var _G$edges$next$value2 = _slicedToArray(G.edges().next().value, 2);

				a = _G$edges$next$value2[0];
				b = _G$edges$next$value2[1];

				assert.ok(set([a, b]).isequal([u, v]));

				var vu = G.eadd(v, u);
				assert.deepEqual(cardinality.len(G.eitr()), 2);

				G.edel(uv);
				assert.deepEqual(cardinality.len(G.eitr()), 1);

				assert.equal(G.eitr().next().value, vu);

				G.edel(vu);
				assert.deepEqual(cardinality.len(G.eitr()), 0);

				G.vdel(u);
				G.vdel(v);
				assert.deepEqual(cardinality.len(G.vitr()), 0);
			});

			test("graph-spec : MultiGraph extensive test > " + title, function () {

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

				deepEqual(cardinality.len(G.initr(V[0])), 6);
				deepEqual(cardinality.len(G.initr(V[1])), 3);
				deepEqual(cardinality.len(G.initr(V[2])), 3);
				deepEqual(cardinality.len(G.initr(V[3])), 3);
				deepEqual(cardinality.len(G.initr(V[4])), 3);
				deepEqual(cardinality.len(G.initr(V[5])), 3);
				deepEqual(cardinality.len(G.initr(V[6])), 2);
				deepEqual(cardinality.len(G.initr(V[7])), 2);
				deepEqual(cardinality.len(G.initr(V[8])), 2);
				deepEqual(cardinality.len(G.initr(V[9])), 3);

				deepEqual(cardinality.len(G.outitr(V[0])), 6);
				deepEqual(cardinality.len(G.outitr(V[1])), 3);
				deepEqual(cardinality.len(G.outitr(V[2])), 3);
				deepEqual(cardinality.len(G.outitr(V[3])), 3);
				deepEqual(cardinality.len(G.outitr(V[4])), 3);
				deepEqual(cardinality.len(G.outitr(V[5])), 3);
				deepEqual(cardinality.len(G.outitr(V[6])), 2);
				deepEqual(cardinality.len(G.outitr(V[7])), 2);
				deepEqual(cardinality.len(G.outitr(V[8])), 2);
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

				deepEqual(cardinality.len(G.outitr(V[0])), 6);
				deepEqual(cardinality.len(G.outitr(V[1])), 3);
				deepEqual(cardinality.len(G.outitr(V[2])), 3);
				deepEqual(cardinality.len(G.outitr(V[3])), 3);
				deepEqual(cardinality.len(G.outitr(V[4])), 3);
				deepEqual(cardinality.len(G.outitr(V[5])), 3);
				deepEqual(cardinality.len(G.outitr(V[6])), 2);
				deepEqual(cardinality.len(G.outitr(V[7])), 2);
				deepEqual(cardinality.len(G.outitr(V[8])), 2);
				deepEqual(cardinality.len(G.outitr(V[9])), 3);

				deepEqual(cardinality.len(G.initr(V[0])), 6);
				deepEqual(cardinality.len(G.initr(V[1])), 3);
				deepEqual(cardinality.len(G.initr(V[2])), 3);
				deepEqual(cardinality.len(G.initr(V[3])), 3);
				deepEqual(cardinality.len(G.initr(V[4])), 3);
				deepEqual(cardinality.len(G.initr(V[5])), 3);
				deepEqual(cardinality.len(G.initr(V[6])), 2);
				deepEqual(cardinality.len(G.initr(V[7])), 2);
				deepEqual(cardinality.len(G.initr(V[8])), 2);
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

				ok(set(G.dsitr(V[0])).isequal([V[1], V[2], V[3]]));
				ok(set(G.dsitr(V[1])).isequal([V[0], V[4]]));
				ok(set(G.dsitr(V[2])).isequal([V[0], V[4]]));
				ok(set(G.dsitr(V[3])).isequal([V[0], V[4]]));
				ok(set(G.dsitr(V[4])).isequal([V[1], V[2], V[3]]));
				ok(set(G.dsitr(V[5])).isequal([V[6], V[7], V[8]]));
				ok(set(G.dsitr(V[6])).isequal([V[5], V[9]]));
				ok(set(G.dsitr(V[7])).isequal([V[5], V[9]]));
				ok(set(G.dsitr(V[8])).isequal([V[5], V[9]]));
				ok(set(G.dsitr(V[9])).isequal([V[6], V[7], V[8]]));

				ok(set(G.dpitr(V[0])).isequal([V[1], V[2], V[3]]));
				ok(set(G.dpitr(V[1])).isequal([V[0], V[4]]));
				ok(set(G.dpitr(V[2])).isequal([V[0], V[4]]));
				ok(set(G.dpitr(V[3])).isequal([V[0], V[4]]));
				ok(set(G.dpitr(V[4])).isequal([V[1], V[2], V[3]]));
				ok(set(G.dpitr(V[5])).isequal([V[6], V[7], V[8]]));
				ok(set(G.dpitr(V[6])).isequal([V[5], V[9]]));
				ok(set(G.dpitr(V[7])).isequal([V[5], V[9]]));
				ok(set(G.dpitr(V[8])).isequal([V[5], V[9]]));
				ok(set(G.dpitr(V[9])).isequal([V[6], V[7], V[8]]));

				deepEqual(cardinality.len(G.edges()), 15, "G.edges( ) length");

				var edges = set(E);

				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = G.edges()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var _step4$value = _slicedToArray(_step4.value, 3);

						var u = _step4$value[0];
						var v = _step4$value[1];
						var e = _step4$value[2];

						ok(edges.has(e));

						ok(set([u, v]).isequal(G.endpoints(e)));

						edges.remove(e);
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

						ok(set(chain([(function () {
							var _ref3 = [];
							var _iteratorNormalCompletion10 = true;
							var _didIteratorError10 = false;
							var _iteratorError10 = undefined;

							try {
								for (var _iterator10 = G.incident(V[i])[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
									var _step10$value = _slicedToArray(_step10.value, 2);

									var u = _step10$value[0];
									var v = _step10$value[1];

									_ref3.push(v);
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

							return _ref3;
						})(), (function () {
							var _ref4 = [];
							var _iteratorNormalCompletion11 = true;
							var _didIteratorError11 = false;
							var _iteratorError11 = undefined;

							try {
								for (var _iterator11 = G.incident(V[i])[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
									var _step11$value = _slicedToArray(_step11.value, 2);

									var u = _step11$value[0];
									var v = _step11$value[1];

									_ref4.push(u);
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

							return _ref4;
						})()])).isequal(chain([[V[i]], (function () {
							var _ref5 = [];
							var _iteratorNormalCompletion12 = true;
							var _didIteratorError12 = false;
							var _iteratorError12 = undefined;

							try {
								for (var _iterator12 = G.ingoing(V[i])[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
									var _step12$value = _slicedToArray(_step12.value, 2);

									var u = _step12$value[0];
									var v = _step12$value[1];

									_ref5.push(u);
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

							return _ref5;
						})(), (function () {
							var _ref6 = [];
							var _iteratorNormalCompletion13 = true;
							var _didIteratorError13 = false;
							var _iteratorError13 = undefined;

							try {
								for (var _iterator13 = G.outgoing(V[i])[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
									var _step13$value = _slicedToArray(_step13.value, 2);

									var u = _step13$value[0];
									var v = _step13$value[1];

									_ref6.push(v);
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

							return _ref6;
						})()])));

						ok(set(G.nitr(V[i])).isequal((function () {
							var _set$isequal = [];
							var _iteratorNormalCompletion14 = true;
							var _didIteratorError14 = false;
							var _iteratorError14 = undefined;

							try {
								for (var _iterator14 = G.incident(V[i])[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
									var _step14$value = _slicedToArray(_step14.value, 2);

									var u = _step14$value[0];
									var v = _step14$value[1];

									_set$isequal.push(u === V[i] ? v : u);
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

							return _set$isequal;
						})()));
						ok(set(G.dpitr(V[i])).isequal((function () {
							var _set$isequal2 = [];
							var _iteratorNormalCompletion15 = true;
							var _didIteratorError15 = false;
							var _iteratorError15 = undefined;

							try {
								for (var _iterator15 = G.ingoing(V[i])[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
									var _step15$value = _slicedToArray(_step15.value, 2);

									var u = _step15$value[0];
									var v = _step15$value[1];

									_set$isequal2.push(u);
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

							return _set$isequal2;
						})()));
						ok(set(G.dsitr(V[i])).isequal((function () {
							var _set$isequal3 = [];
							var _iteratorNormalCompletion16 = true;
							var _didIteratorError16 = false;
							var _iteratorError16 = undefined;

							try {
								for (var _iterator16 = G.outgoing(V[i])[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
									var _step16$value = _slicedToArray(_step16.value, 2);

									var u = _step16$value[0];
									var v = _step16$value[1];

									_set$isequal3.push(v);
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

							return _set$isequal3;
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

		exports.MultiGraph = MultiGraph;

		/* js/src/001-spec/03-DiGraph.js */

		var DiGraph = function DiGraph(title, Constructor) {

			test("graph-spec : DiGraph simple test > " + title, function (assert) {

				var G = new Constructor();

				var u = G.vadd();
				var v = G.vadd();

				var uv = G.eadd(u, v);

				assert.ok(set([u, v]).isequal(G.vitr()));

				var _G$edges$next$value3 = _slicedToArray(G.edges().next().value, 2);

				var a = _G$edges$next$value3[0];
				var b = _G$edges$next$value3[1];

				assert.deepEqual([a, b], [u, v]);

				G.reverse();

				assert.ok(set([u, v]).isequal(G.vitr()));

				var _G$edges$next$value4 = _slicedToArray(G.edges().next().value, 2);

				a = _G$edges$next$value4[0];
				b = _G$edges$next$value4[1];

				assert.deepEqual([a, b], [v, u]);

				G.edel(uv);
				assert.deepEqual(cardinality.len(G.eitr()), 0);

				G.vdel(u);
				G.vdel(v);
				assert.deepEqual(cardinality.len(G.vitr()), 0);
			});

			test("graph-spec : DiGraph extensive test > " + title, function () {

				var G = new Constructor();

				var n = 10;

				var V = undefined,
				    E = undefined;

				var init = function init() {

					var V = (function () {
						var _V2 = [];
						var _iteratorNormalCompletion17 = true;
						var _didIteratorError17 = false;
						var _iteratorError17 = undefined;

						try {
							for (var _iterator17 = range(n)[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
								var i = _step17.value;

								_V2.push(G.vadd(i));
							}
						} catch (err) {
							_didIteratorError17 = true;
							_iteratorError17 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion17 && _iterator17["return"]) {
									_iterator17["return"]();
								}
							} finally {
								if (_didIteratorError17) {
									throw _iteratorError17;
								}
							}
						}

						return _V2;
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

				var _init5 = init();

				var _init52 = _slicedToArray(_init5, 2);

				V = _init52[0];
				E = _init52[1];

				deepEqual(cardinality.len(G.vitr()), 10);
				deepEqual(cardinality.len(G.eitr()), 12);

				delete_all_edges();

				deepEqual(cardinality.len(G.vitr()), 10);
				deepEqual(cardinality.len(G.eitr()), 0);

				delete_all_vertices();

				deepEqual(cardinality.len(G.vitr()), 0);
				deepEqual(cardinality.len(G.eitr()), 0);

				var _init6 = init();

				var _init62 = _slicedToArray(_init6, 2);

				V = _init62[0];
				E = _init62[1];

				deepEqual(cardinality.len(G.vitr()), 10);
				deepEqual(cardinality.len(G.eitr()), 12);

				delete_all_vertices();

				deepEqual(cardinality.len(G.vitr()), 0);
				deepEqual(cardinality.len(G.eitr()), 0);

				var _init7 = init();

				var _init72 = _slicedToArray(_init7, 2);

				V = _init72[0];
				E = _init72[1];

				deepEqual(cardinality.len(G.iitr(V[0])), 3);
				deepEqual(cardinality.len(G.iitr(V[1])), 2);
				deepEqual(cardinality.len(G.iitr(V[2])), 2);
				deepEqual(cardinality.len(G.iitr(V[3])), 2);
				deepEqual(cardinality.len(G.iitr(V[4])), 3);
				deepEqual(cardinality.len(G.iitr(V[5])), 3);
				deepEqual(cardinality.len(G.iitr(V[6])), 2);
				deepEqual(cardinality.len(G.iitr(V[7])), 2);
				deepEqual(cardinality.len(G.iitr(V[8])), 2);
				deepEqual(cardinality.len(G.iitr(V[9])), 3);

				deepEqual(cardinality.len(G.initr(V[0])), 0);
				deepEqual(cardinality.len(G.initr(V[1])), 2);
				deepEqual(cardinality.len(G.initr(V[2])), 2);
				deepEqual(cardinality.len(G.initr(V[3])), 2);
				deepEqual(cardinality.len(G.initr(V[4])), 0);
				deepEqual(cardinality.len(G.initr(V[5])), 0);
				deepEqual(cardinality.len(G.initr(V[6])), 2);
				deepEqual(cardinality.len(G.initr(V[7])), 2);
				deepEqual(cardinality.len(G.initr(V[8])), 2);
				deepEqual(cardinality.len(G.initr(V[9])), 0);

				deepEqual(cardinality.len(G.outitr(V[0])), 3);
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

				deepEqual(cardinality.len(G.iitr(V[0])), 3);
				deepEqual(cardinality.len(G.iitr(V[1])), 2);
				deepEqual(cardinality.len(G.iitr(V[2])), 2);
				deepEqual(cardinality.len(G.iitr(V[3])), 2);
				deepEqual(cardinality.len(G.iitr(V[4])), 3);
				deepEqual(cardinality.len(G.iitr(V[5])), 3);
				deepEqual(cardinality.len(G.iitr(V[6])), 2);
				deepEqual(cardinality.len(G.iitr(V[7])), 2);
				deepEqual(cardinality.len(G.iitr(V[8])), 2);
				deepEqual(cardinality.len(G.iitr(V[9])), 3);

				deepEqual(cardinality.len(G.outitr(V[0])), 0);
				deepEqual(cardinality.len(G.outitr(V[1])), 2);
				deepEqual(cardinality.len(G.outitr(V[2])), 2);
				deepEqual(cardinality.len(G.outitr(V[3])), 2);
				deepEqual(cardinality.len(G.outitr(V[4])), 0);
				deepEqual(cardinality.len(G.outitr(V[5])), 0);
				deepEqual(cardinality.len(G.outitr(V[6])), 2);
				deepEqual(cardinality.len(G.outitr(V[7])), 2);
				deepEqual(cardinality.len(G.outitr(V[8])), 2);
				deepEqual(cardinality.len(G.outitr(V[9])), 0);

				deepEqual(cardinality.len(G.initr(V[0])), 3);
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

				deepEqual(cardinality.len(G.edges()), 12, "G.edges( ) length");

				var edges = set(E);

				var _iteratorNormalCompletion18 = true;
				var _didIteratorError18 = false;
				var _iteratorError18 = undefined;

				try {
					for (var _iterator18 = G.edges()[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
						var _step18$value = _slicedToArray(_step18.value, 3);

						var u = _step18$value[0];
						var v = _step18$value[1];
						var e = _step18$value[2];

						ok(edges.has(e));

						deepEqual([u, v], G.endpoints(e));

						edges.remove(e);
					}
				} catch (err) {
					_didIteratorError18 = true;
					_iteratorError18 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion18 && _iterator18["return"]) {
							_iterator18["return"]();
						}
					} finally {
						if (_didIteratorError18) {
							throw _iteratorError18;
						}
					}
				}

				var _iteratorNormalCompletion19 = true;
				var _didIteratorError19 = false;
				var _iteratorError19 = undefined;

				try {
					var _loop2 = function () {
						var i = _step19.value;

						ok(all((function () {
							var _all4 = [];
							var _iteratorNormalCompletion20 = true;
							var _didIteratorError20 = false;
							var _iteratorError20 = undefined;

							try {
								for (var _iterator20 = G.incident(V[i])[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
									var _step20$value = _slicedToArray(_step20.value, 2);

									var u = _step20$value[0];
									var v = _step20$value[1];

									_all4.push(u === V[i] || v === V[i]);
								}
							} catch (err) {
								_didIteratorError20 = true;
								_iteratorError20 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion20 && _iterator20["return"]) {
										_iterator20["return"]();
									}
								} finally {
									if (_didIteratorError20) {
										throw _iteratorError20;
									}
								}
							}

							return _all4;
						})()));

						ok(set((function () {
							var _set2 = [];
							var _iteratorNormalCompletion21 = true;
							var _didIteratorError21 = false;
							var _iteratorError21 = undefined;

							try {
								for (var _iterator21 = G.incident(V[i])[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
									var _step21$value = _slicedToArray(_step21.value, 3);

									var u = _step21$value[0];
									var v = _step21$value[1];
									var e = _step21$value[2];

									_set2.push(e);
								}
							} catch (err) {
								_didIteratorError21 = true;
								_iteratorError21 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion21 && _iterator21["return"]) {
										_iterator21["return"]();
									}
								} finally {
									if (_didIteratorError21) {
										throw _iteratorError21;
									}
								}
							}

							return _set2;
						})()).isequal(chain([(function () {
							var _ref7 = [];
							var _iteratorNormalCompletion22 = true;
							var _didIteratorError22 = false;
							var _iteratorError22 = undefined;

							try {
								for (var _iterator22 = G.ingoing(V[i])[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
									var _step22$value = _slicedToArray(_step22.value, 3);

									var u = _step22$value[0];
									var v = _step22$value[1];
									var e = _step22$value[2];

									_ref7.push(e);
								}
							} catch (err) {
								_didIteratorError22 = true;
								_iteratorError22 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion22 && _iterator22["return"]) {
										_iterator22["return"]();
									}
								} finally {
									if (_didIteratorError22) {
										throw _iteratorError22;
									}
								}
							}

							return _ref7;
						})(), (function () {
							var _ref8 = [];
							var _iteratorNormalCompletion23 = true;
							var _didIteratorError23 = false;
							var _iteratorError23 = undefined;

							try {
								for (var _iterator23 = G.outgoing(V[i])[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
									var _step23$value = _slicedToArray(_step23.value, 3);

									var u = _step23$value[0];
									var v = _step23$value[1];
									var e = _step23$value[2];

									_ref8.push(e);
								}
							} catch (err) {
								_didIteratorError23 = true;
								_iteratorError23 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion23 && _iterator23["return"]) {
										_iterator23["return"]();
									}
								} finally {
									if (_didIteratorError23) {
										throw _iteratorError23;
									}
								}
							}

							return _ref8;
						})()])));

						ok(set((function () {
							var _set3 = [];
							var _iteratorNormalCompletion24 = true;
							var _didIteratorError24 = false;
							var _iteratorError24 = undefined;

							try {
								for (var _iterator24 = G.incident(V[i])[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
									var _step24$value = _slicedToArray(_step24.value, 2);

									var u = _step24$value[0];
									var v = _step24$value[1];

									_set3.push(v);
								}
							} catch (err) {
								_didIteratorError24 = true;
								_iteratorError24 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion24 && _iterator24["return"]) {
										_iterator24["return"]();
									}
								} finally {
									if (_didIteratorError24) {
										throw _iteratorError24;
									}
								}
							}

							return _set3;
						})()).isequal(chain([(function () {
							var _ref9 = [];
							var _iteratorNormalCompletion25 = true;
							var _didIteratorError25 = false;
							var _iteratorError25 = undefined;

							try {
								for (var _iterator25 = G.ingoing(V[i])[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
									var _step25$value = _slicedToArray(_step25.value, 2);

									var u = _step25$value[0];
									var v = _step25$value[1];

									_ref9.push(v);
								}
							} catch (err) {
								_didIteratorError25 = true;
								_iteratorError25 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion25 && _iterator25["return"]) {
										_iterator25["return"]();
									}
								} finally {
									if (_didIteratorError25) {
										throw _iteratorError25;
									}
								}
							}

							return _ref9;
						})(), (function () {
							var _ref10 = [];
							var _iteratorNormalCompletion26 = true;
							var _didIteratorError26 = false;
							var _iteratorError26 = undefined;

							try {
								for (var _iterator26 = G.outgoing(V[i])[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
									var _step26$value = _slicedToArray(_step26.value, 2);

									var u = _step26$value[0];
									var v = _step26$value[1];

									_ref10.push(v);
								}
							} catch (err) {
								_didIteratorError26 = true;
								_iteratorError26 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion26 && _iterator26["return"]) {
										_iterator26["return"]();
									}
								} finally {
									if (_didIteratorError26) {
										throw _iteratorError26;
									}
								}
							}

							return _ref10;
						})()])));

						ok(set((function () {
							var _set4 = [];
							var _iteratorNormalCompletion27 = true;
							var _didIteratorError27 = false;
							var _iteratorError27 = undefined;

							try {
								for (var _iterator27 = G.incident(V[i])[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
									var _step27$value = _slicedToArray(_step27.value, 1);

									var u = _step27$value[0];

									_set4.push(u);
								}
							} catch (err) {
								_didIteratorError27 = true;
								_iteratorError27 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion27 && _iterator27["return"]) {
										_iterator27["return"]();
									}
								} finally {
									if (_didIteratorError27) {
										throw _iteratorError27;
									}
								}
							}

							return _set4;
						})()).isequal(chain([(function () {
							var _ref11 = [];
							var _iteratorNormalCompletion28 = true;
							var _didIteratorError28 = false;
							var _iteratorError28 = undefined;

							try {
								for (var _iterator28 = G.ingoing(V[i])[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
									var _step28$value = _slicedToArray(_step28.value, 1);

									var u = _step28$value[0];

									_ref11.push(u);
								}
							} catch (err) {
								_didIteratorError28 = true;
								_iteratorError28 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion28 && _iterator28["return"]) {
										_iterator28["return"]();
									}
								} finally {
									if (_didIteratorError28) {
										throw _iteratorError28;
									}
								}
							}

							return _ref11;
						})(), (function () {
							var _ref12 = [];
							var _iteratorNormalCompletion29 = true;
							var _didIteratorError29 = false;
							var _iteratorError29 = undefined;

							try {
								for (var _iterator29 = G.outgoing(V[i])[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
									var _step29$value = _slicedToArray(_step29.value, 1);

									var u = _step29$value[0];

									_ref12.push(u);
								}
							} catch (err) {
								_didIteratorError29 = true;
								_iteratorError29 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion29 && _iterator29["return"]) {
										_iterator29["return"]();
									}
								} finally {
									if (_didIteratorError29) {
										throw _iteratorError29;
									}
								}
							}

							return _ref12;
						})()])));

						ok(set(G.nitr(V[i])).isequal((function () {
							var _set$isequal4 = [];
							var _iteratorNormalCompletion30 = true;
							var _didIteratorError30 = false;
							var _iteratorError30 = undefined;

							try {
								for (var _iterator30 = G.incident(V[i])[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
									var _step30$value = _slicedToArray(_step30.value, 2);

									var u = _step30$value[0];
									var v = _step30$value[1];

									_set$isequal4.push(u === V[i] ? v : u);
								}
							} catch (err) {
								_didIteratorError30 = true;
								_iteratorError30 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion30 && _iterator30["return"]) {
										_iterator30["return"]();
									}
								} finally {
									if (_didIteratorError30) {
										throw _iteratorError30;
									}
								}
							}

							return _set$isequal4;
						})()));
						ok(set(G.dpitr(V[i])).isequal((function () {
							var _set$isequal5 = [];
							var _iteratorNormalCompletion31 = true;
							var _didIteratorError31 = false;
							var _iteratorError31 = undefined;

							try {
								for (var _iterator31 = G.ingoing(V[i])[Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
									var _step31$value = _slicedToArray(_step31.value, 2);

									var u = _step31$value[0];
									var v = _step31$value[1];

									_set$isequal5.push(u);
								}
							} catch (err) {
								_didIteratorError31 = true;
								_iteratorError31 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion31 && _iterator31["return"]) {
										_iterator31["return"]();
									}
								} finally {
									if (_didIteratorError31) {
										throw _iteratorError31;
									}
								}
							}

							return _set$isequal5;
						})()));
						ok(set(G.dsitr(V[i])).isequal((function () {
							var _set$isequal6 = [];
							var _iteratorNormalCompletion32 = true;
							var _didIteratorError32 = false;
							var _iteratorError32 = undefined;

							try {
								for (var _iterator32 = G.outgoing(V[i])[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
									var _step32$value = _slicedToArray(_step32.value, 2);

									var u = _step32$value[0];
									var v = _step32$value[1];

									_set$isequal6.push(v);
								}
							} catch (err) {
								_didIteratorError32 = true;
								_iteratorError32 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion32 && _iterator32["return"]) {
										_iterator32["return"]();
									}
								} finally {
									if (_didIteratorError32) {
										throw _iteratorError32;
									}
								}
							}

							return _set$isequal6;
						})()));
					};

					for (var _iterator19 = range(n)[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
						_loop2();
					}
				} catch (err) {
					_didIteratorError19 = true;
					_iteratorError19 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion19 && _iterator19["return"]) {
							_iterator19["return"]();
						}
					} finally {
						if (_didIteratorError19) {
							throw _iteratorError19;
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

		exports.DiGraph = DiGraph;

		/* js/src/001-spec/04-MultiDiGraph.js */

		var MultiDiGraph = function MultiDiGraph(title, Constructor) {

			test("graph-spec : MultiDiGraph simple test > " + title, function (assert) {

				var G = new Constructor();

				var u = G.vadd();
				var v = G.vadd();

				var uv = G.eadd(u, v);

				assert.ok(set([u, v]).isequal(G.vitr()));

				var _G$edges$next$value5 = _slicedToArray(G.edges().next().value, 2);

				var a = _G$edges$next$value5[0];
				var b = _G$edges$next$value5[1];

				assert.deepEqual([a, b], [u, v]);

				G.reverse();

				assert.ok(set([u, v]).isequal(G.vitr()));

				var _G$edges$next$value6 = _slicedToArray(G.edges().next().value, 2);

				a = _G$edges$next$value6[0];
				b = _G$edges$next$value6[1];

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
						var _V3 = [];
						var _iteratorNormalCompletion33 = true;
						var _didIteratorError33 = false;
						var _iteratorError33 = undefined;

						try {
							for (var _iterator33 = range(n)[Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
								var i = _step33.value;

								_V3.push(G.vadd(i));
							}
						} catch (err) {
							_didIteratorError33 = true;
							_iteratorError33 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion33 && _iterator33["return"]) {
									_iterator33["return"]();
								}
							} finally {
								if (_didIteratorError33) {
									throw _iteratorError33;
								}
							}
						}

						return _V3;
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

				var _init8 = init();

				var _init82 = _slicedToArray(_init8, 2);

				V = _init82[0];
				E = _init82[1];

				deepEqual(cardinality.len(G.vitr()), 10);
				deepEqual(cardinality.len(G.eitr()), 15);

				delete_all_edges();

				deepEqual(cardinality.len(G.vitr()), 10);
				deepEqual(cardinality.len(G.eitr()), 0);

				delete_all_vertices();

				deepEqual(cardinality.len(G.vitr()), 0);
				deepEqual(cardinality.len(G.eitr()), 0);

				var _init9 = init();

				var _init92 = _slicedToArray(_init9, 2);

				V = _init92[0];
				E = _init92[1];

				deepEqual(cardinality.len(G.vitr()), 10);
				deepEqual(cardinality.len(G.eitr()), 15);

				delete_all_vertices();

				deepEqual(cardinality.len(G.vitr()), 0);
				deepEqual(cardinality.len(G.eitr()), 0);

				var _init10 = init();

				var _init102 = _slicedToArray(_init10, 2);

				V = _init102[0];
				E = _init102[1];

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

				var _iteratorNormalCompletion34 = true;
				var _didIteratorError34 = false;
				var _iteratorError34 = undefined;

				try {
					for (var _iterator34 = G.edges()[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
						var _step34$value = _slicedToArray(_step34.value, 3);

						var u = _step34$value[0];
						var v = _step34$value[1];
						var e = _step34$value[2];

						ok(edges.has(e));

						deepEqual([u, v], G.endpoints(e));

						edges.remove(e);
					}
				} catch (err) {
					_didIteratorError34 = true;
					_iteratorError34 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion34 && _iterator34["return"]) {
							_iterator34["return"]();
						}
					} finally {
						if (_didIteratorError34) {
							throw _iteratorError34;
						}
					}
				}

				var _iteratorNormalCompletion35 = true;
				var _didIteratorError35 = false;
				var _iteratorError35 = undefined;

				try {
					var _loop3 = function () {
						var i = _step35.value;

						ok(all((function () {
							var _all5 = [];
							var _iteratorNormalCompletion36 = true;
							var _didIteratorError36 = false;
							var _iteratorError36 = undefined;

							try {
								for (var _iterator36 = G.incident(V[i])[Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
									var _step36$value = _slicedToArray(_step36.value, 2);

									var u = _step36$value[0];
									var v = _step36$value[1];

									_all5.push(u === V[i] || v === V[i]);
								}
							} catch (err) {
								_didIteratorError36 = true;
								_iteratorError36 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion36 && _iterator36["return"]) {
										_iterator36["return"]();
									}
								} finally {
									if (_didIteratorError36) {
										throw _iteratorError36;
									}
								}
							}

							return _all5;
						})()));

						ok(set((function () {
							var _set5 = [];
							var _iteratorNormalCompletion37 = true;
							var _didIteratorError37 = false;
							var _iteratorError37 = undefined;

							try {
								for (var _iterator37 = G.incident(V[i])[Symbol.iterator](), _step37; !(_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done); _iteratorNormalCompletion37 = true) {
									var _step37$value = _slicedToArray(_step37.value, 3);

									var u = _step37$value[0];
									var v = _step37$value[1];
									var e = _step37$value[2];

									_set5.push(e);
								}
							} catch (err) {
								_didIteratorError37 = true;
								_iteratorError37 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion37 && _iterator37["return"]) {
										_iterator37["return"]();
									}
								} finally {
									if (_didIteratorError37) {
										throw _iteratorError37;
									}
								}
							}

							return _set5;
						})()).isequal(chain([(function () {
							var _ref13 = [];
							var _iteratorNormalCompletion38 = true;
							var _didIteratorError38 = false;
							var _iteratorError38 = undefined;

							try {
								for (var _iterator38 = G.ingoing(V[i])[Symbol.iterator](), _step38; !(_iteratorNormalCompletion38 = (_step38 = _iterator38.next()).done); _iteratorNormalCompletion38 = true) {
									var _step38$value = _slicedToArray(_step38.value, 3);

									var u = _step38$value[0];
									var v = _step38$value[1];
									var e = _step38$value[2];

									_ref13.push(e);
								}
							} catch (err) {
								_didIteratorError38 = true;
								_iteratorError38 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion38 && _iterator38["return"]) {
										_iterator38["return"]();
									}
								} finally {
									if (_didIteratorError38) {
										throw _iteratorError38;
									}
								}
							}

							return _ref13;
						})(), (function () {
							var _ref14 = [];
							var _iteratorNormalCompletion39 = true;
							var _didIteratorError39 = false;
							var _iteratorError39 = undefined;

							try {
								for (var _iterator39 = G.outgoing(V[i])[Symbol.iterator](), _step39; !(_iteratorNormalCompletion39 = (_step39 = _iterator39.next()).done); _iteratorNormalCompletion39 = true) {
									var _step39$value = _slicedToArray(_step39.value, 3);

									var u = _step39$value[0];
									var v = _step39$value[1];
									var e = _step39$value[2];

									_ref14.push(e);
								}
							} catch (err) {
								_didIteratorError39 = true;
								_iteratorError39 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion39 && _iterator39["return"]) {
										_iterator39["return"]();
									}
								} finally {
									if (_didIteratorError39) {
										throw _iteratorError39;
									}
								}
							}

							return _ref14;
						})()])));

						ok(set((function () {
							var _set6 = [];
							var _iteratorNormalCompletion40 = true;
							var _didIteratorError40 = false;
							var _iteratorError40 = undefined;

							try {
								for (var _iterator40 = G.incident(V[i])[Symbol.iterator](), _step40; !(_iteratorNormalCompletion40 = (_step40 = _iterator40.next()).done); _iteratorNormalCompletion40 = true) {
									var _step40$value = _slicedToArray(_step40.value, 2);

									var u = _step40$value[0];
									var v = _step40$value[1];

									_set6.push(v);
								}
							} catch (err) {
								_didIteratorError40 = true;
								_iteratorError40 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion40 && _iterator40["return"]) {
										_iterator40["return"]();
									}
								} finally {
									if (_didIteratorError40) {
										throw _iteratorError40;
									}
								}
							}

							return _set6;
						})()).isequal(chain([(function () {
							var _ref15 = [];
							var _iteratorNormalCompletion41 = true;
							var _didIteratorError41 = false;
							var _iteratorError41 = undefined;

							try {
								for (var _iterator41 = G.ingoing(V[i])[Symbol.iterator](), _step41; !(_iteratorNormalCompletion41 = (_step41 = _iterator41.next()).done); _iteratorNormalCompletion41 = true) {
									var _step41$value = _slicedToArray(_step41.value, 2);

									var u = _step41$value[0];
									var v = _step41$value[1];

									_ref15.push(v);
								}
							} catch (err) {
								_didIteratorError41 = true;
								_iteratorError41 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion41 && _iterator41["return"]) {
										_iterator41["return"]();
									}
								} finally {
									if (_didIteratorError41) {
										throw _iteratorError41;
									}
								}
							}

							return _ref15;
						})(), (function () {
							var _ref16 = [];
							var _iteratorNormalCompletion42 = true;
							var _didIteratorError42 = false;
							var _iteratorError42 = undefined;

							try {
								for (var _iterator42 = G.outgoing(V[i])[Symbol.iterator](), _step42; !(_iteratorNormalCompletion42 = (_step42 = _iterator42.next()).done); _iteratorNormalCompletion42 = true) {
									var _step42$value = _slicedToArray(_step42.value, 2);

									var u = _step42$value[0];
									var v = _step42$value[1];

									_ref16.push(v);
								}
							} catch (err) {
								_didIteratorError42 = true;
								_iteratorError42 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion42 && _iterator42["return"]) {
										_iterator42["return"]();
									}
								} finally {
									if (_didIteratorError42) {
										throw _iteratorError42;
									}
								}
							}

							return _ref16;
						})()])));

						ok(set((function () {
							var _set7 = [];
							var _iteratorNormalCompletion43 = true;
							var _didIteratorError43 = false;
							var _iteratorError43 = undefined;

							try {
								for (var _iterator43 = G.incident(V[i])[Symbol.iterator](), _step43; !(_iteratorNormalCompletion43 = (_step43 = _iterator43.next()).done); _iteratorNormalCompletion43 = true) {
									var _step43$value = _slicedToArray(_step43.value, 1);

									var u = _step43$value[0];

									_set7.push(u);
								}
							} catch (err) {
								_didIteratorError43 = true;
								_iteratorError43 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion43 && _iterator43["return"]) {
										_iterator43["return"]();
									}
								} finally {
									if (_didIteratorError43) {
										throw _iteratorError43;
									}
								}
							}

							return _set7;
						})()).isequal(chain([(function () {
							var _ref17 = [];
							var _iteratorNormalCompletion44 = true;
							var _didIteratorError44 = false;
							var _iteratorError44 = undefined;

							try {
								for (var _iterator44 = G.ingoing(V[i])[Symbol.iterator](), _step44; !(_iteratorNormalCompletion44 = (_step44 = _iterator44.next()).done); _iteratorNormalCompletion44 = true) {
									var _step44$value = _slicedToArray(_step44.value, 1);

									var u = _step44$value[0];

									_ref17.push(u);
								}
							} catch (err) {
								_didIteratorError44 = true;
								_iteratorError44 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion44 && _iterator44["return"]) {
										_iterator44["return"]();
									}
								} finally {
									if (_didIteratorError44) {
										throw _iteratorError44;
									}
								}
							}

							return _ref17;
						})(), (function () {
							var _ref18 = [];
							var _iteratorNormalCompletion45 = true;
							var _didIteratorError45 = false;
							var _iteratorError45 = undefined;

							try {
								for (var _iterator45 = G.outgoing(V[i])[Symbol.iterator](), _step45; !(_iteratorNormalCompletion45 = (_step45 = _iterator45.next()).done); _iteratorNormalCompletion45 = true) {
									var _step45$value = _slicedToArray(_step45.value, 1);

									var u = _step45$value[0];

									_ref18.push(u);
								}
							} catch (err) {
								_didIteratorError45 = true;
								_iteratorError45 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion45 && _iterator45["return"]) {
										_iterator45["return"]();
									}
								} finally {
									if (_didIteratorError45) {
										throw _iteratorError45;
									}
								}
							}

							return _ref18;
						})()])));

						ok(set(G.nitr(V[i])).isequal((function () {
							var _set$isequal7 = [];
							var _iteratorNormalCompletion46 = true;
							var _didIteratorError46 = false;
							var _iteratorError46 = undefined;

							try {
								for (var _iterator46 = G.incident(V[i])[Symbol.iterator](), _step46; !(_iteratorNormalCompletion46 = (_step46 = _iterator46.next()).done); _iteratorNormalCompletion46 = true) {
									var _step46$value = _slicedToArray(_step46.value, 2);

									var u = _step46$value[0];
									var v = _step46$value[1];

									_set$isequal7.push(u === V[i] ? v : u);
								}
							} catch (err) {
								_didIteratorError46 = true;
								_iteratorError46 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion46 && _iterator46["return"]) {
										_iterator46["return"]();
									}
								} finally {
									if (_didIteratorError46) {
										throw _iteratorError46;
									}
								}
							}

							return _set$isequal7;
						})()));
						ok(set(G.dpitr(V[i])).isequal((function () {
							var _set$isequal8 = [];
							var _iteratorNormalCompletion47 = true;
							var _didIteratorError47 = false;
							var _iteratorError47 = undefined;

							try {
								for (var _iterator47 = G.ingoing(V[i])[Symbol.iterator](), _step47; !(_iteratorNormalCompletion47 = (_step47 = _iterator47.next()).done); _iteratorNormalCompletion47 = true) {
									var _step47$value = _slicedToArray(_step47.value, 2);

									var u = _step47$value[0];
									var v = _step47$value[1];

									_set$isequal8.push(u);
								}
							} catch (err) {
								_didIteratorError47 = true;
								_iteratorError47 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion47 && _iterator47["return"]) {
										_iterator47["return"]();
									}
								} finally {
									if (_didIteratorError47) {
										throw _iteratorError47;
									}
								}
							}

							return _set$isequal8;
						})()));
						ok(set(G.dsitr(V[i])).isequal((function () {
							var _set$isequal9 = [];
							var _iteratorNormalCompletion48 = true;
							var _didIteratorError48 = false;
							var _iteratorError48 = undefined;

							try {
								for (var _iterator48 = G.outgoing(V[i])[Symbol.iterator](), _step48; !(_iteratorNormalCompletion48 = (_step48 = _iterator48.next()).done); _iteratorNormalCompletion48 = true) {
									var _step48$value = _slicedToArray(_step48.value, 2);

									var u = _step48$value[0];
									var v = _step48$value[1];

									_set$isequal9.push(v);
								}
							} catch (err) {
								_didIteratorError48 = true;
								_iteratorError48 = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion48 && _iterator48["return"]) {
										_iterator48["return"]();
									}
								} finally {
									if (_didIteratorError48) {
										throw _iteratorError48;
									}
								}
							}

							return _set$isequal9;
						})()));
					};

					for (var _iterator35 = range(n)[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
						_loop3();
					}
				} catch (err) {
					_didIteratorError35 = true;
					_iteratorError35 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion35 && _iterator35["return"]) {
							_iterator35["return"]();
						}
					} finally {
						if (_didIteratorError35) {
							throw _iteratorError35;
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