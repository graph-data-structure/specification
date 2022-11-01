

const MultiDiGraph = function ( title , Constructor ) {

methods( title , Constructor ) ;

test( "graph-spec : MultiDiGraph simple test > " + title , function ( assert ) {

	const G = new Constructor( ) ;

	const u = G.vadd( "A" ) ;
	const v = G.vadd( "B" ) ;

	const uv = G.eadd( u , v ) ;

	assert.ok( set( G.vitr( ) ).isequal( G.vertices( ) ) ) ;

	assert.ok( set( [ u , v ] ).isequal( G.vitr( ) ) ) ;
	let [ a , b ] = G.edges( ).next( ).value ;
	assert.deepEqual( [ a , b ] , [ u , v ] ) ;

	G.reverse( ) ;

	assert.ok( set( [ u , v ] ).isequal( G.vitr( ) ) ) ;
	[ a , b ] = G.edges( ).next( ).value ;
	assert.deepEqual( [ a , b ] , [ v , u ] ) ;

	G.edel( uv ) ;
	assert.deepEqual( cardinality.len( G.eitr( ) ) , 0 ) ;

	G.vdel( u ) ;
	G.vdel( v ) ;
	assert.deepEqual( cardinality.len( G.vitr( ) ) , 0 ) ;

} ) ;

test( "graph-spec : MultiDiGraph extensive test > " + title , function ( ) {

	const G = new Constructor( ) ;

	const n = 10 ;

	let V , E ;

	const init = function ( ) {

		const V = list(map((i) => G.vadd(i), range( n ))) ;
		assert.ok( set( G.vitr( ) ).isequal( G.vertices( ) ) ) ;

		const E = [

			G.eadd( V[0] , V[1] ) ,
			G.eadd( V[0] , V[2] ) ,
			G.eadd( V[0] , V[3] ) ,

			G.eadd( V[4] , V[1] ) ,
			G.eadd( V[4] , V[2] ) ,
			G.eadd( V[4] , V[3] ) ,

			G.eadd( V[5] , V[6] ) ,
			G.eadd( V[5] , V[7] ) ,
			G.eadd( V[5] , V[8] ) ,

			G.eadd( V[9] , V[6] ) ,
			G.eadd( V[9] , V[7] ) ,
			G.eadd( V[9] , V[8] ) ,

			G.eadd( V[0] , V[1] ) ,
			G.eadd( V[0] , V[2] ) ,
			G.eadd( V[0] , V[3] ) ,

		] ;

		return [ V , E ] ;

	} ;

	const delete_all_edges = ( ) => ex( map( G.edel.bind( G ) , E ) ) ;
	const delete_all_vertices = ( ) => ex( map( G.vdel.bind( G ) , V ) ) ;

	[ V , E ] = init( ) ;

	deepEqual( cardinality.len( G.vitr( ) ) , 10 ) ;
	deepEqual( cardinality.len( G.eitr( ) ) , 15 ) ;

	delete_all_edges( ) ;

	deepEqual( cardinality.len( G.vitr( ) ) , 10 ) ;
	deepEqual( cardinality.len( G.eitr( ) ) , 0 ) ;

	delete_all_vertices( ) ;

	deepEqual( cardinality.len( G.vitr( ) ) , 0 ) ;
	deepEqual( cardinality.len( G.eitr( ) ) , 0 ) ;

	[ V , E ] = init( ) ;

	deepEqual( cardinality.len( G.vitr( ) ) , 10 ) ;
	deepEqual( cardinality.len( G.eitr( ) ) , 15 ) ;

	delete_all_vertices( ) ;

	deepEqual( cardinality.len( G.vitr( ) ) , 0 ) ;
	deepEqual( cardinality.len( G.eitr( ) ) , 0 ) ;

	[ V , E ] = init( ) ;

	deepEqual( cardinality.len( G.iitr( V[0] ) ) , 6 ) ;
	deepEqual( cardinality.len( G.iitr( V[1] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[2] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[3] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[4] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[5] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[6] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[7] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[8] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[9] ) ) , 3 ) ;

	deepEqual( cardinality.len( G.initr( V[0] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.initr( V[1] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.initr( V[2] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.initr( V[3] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.initr( V[4] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.initr( V[5] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.initr( V[6] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.initr( V[7] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.initr( V[8] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.initr( V[9] ) ) , 0 ) ;

	deepEqual( cardinality.len( G.outitr( V[0] ) ) , 6 ) ;
	deepEqual( cardinality.len( G.outitr( V[1] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.outitr( V[2] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.outitr( V[3] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.outitr( V[4] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.outitr( V[5] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.outitr( V[6] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.outitr( V[7] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.outitr( V[8] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.outitr( V[9] ) ) , 3 ) ;

	G.reverse( ) ;

	deepEqual( cardinality.len( G.iitr( V[0] ) ) , 6 ) ;
	deepEqual( cardinality.len( G.iitr( V[1] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[2] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[3] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[4] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[5] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[6] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[7] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[8] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[9] ) ) , 3 ) ;

	deepEqual( cardinality.len( G.outitr( V[0] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.outitr( V[1] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.outitr( V[2] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.outitr( V[3] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.outitr( V[4] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.outitr( V[5] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.outitr( V[6] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.outitr( V[7] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.outitr( V[8] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.outitr( V[9] ) ) , 0 ) ;

	deepEqual( cardinality.len( G.initr( V[0] ) ) , 6 ) ;
	deepEqual( cardinality.len( G.initr( V[1] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.initr( V[2] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.initr( V[3] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.initr( V[4] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.initr( V[5] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.initr( V[6] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.initr( V[7] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.initr( V[8] ) ) , 0 ) ;
	deepEqual( cardinality.len( G.initr( V[9] ) ) , 3 ) ;

	ok( set( G.nitr( V[0] ) ).isequal( [ V[1] , V[2] , V[3] ] ) ) ;
	ok( set( G.nitr( V[1] ) ).isequal( [ V[0] , V[4] ] ) ) ;
	ok( set( G.nitr( V[2] ) ).isequal( [ V[0] , V[4] ] ) ) ;
	ok( set( G.nitr( V[3] ) ).isequal( [ V[0] , V[4] ] ) ) ;
	ok( set( G.nitr( V[4] ) ).isequal( [ V[1] , V[2] , V[3] ] ) ) ;
	ok( set( G.nitr( V[5] ) ).isequal( [ V[6] , V[7] , V[8] ] ) ) ;
	ok( set( G.nitr( V[6] ) ).isequal( [ V[5] , V[9] ] ) ) ;
	ok( set( G.nitr( V[7] ) ).isequal( [ V[5] , V[9] ] ) ) ;
	ok( set( G.nitr( V[8] ) ).isequal( [ V[5] , V[9] ] ) ) ;
	ok( set( G.nitr( V[9] ) ).isequal( [ V[6] , V[7] , V[8] ] ) ) ;

	ok( set( G.dsitr( V[0] ) ).isequal( [ ] ) ) ;
	ok( set( G.dsitr( V[1] ) ).isequal( [ V[0] , V[4] ] ) ) ;
	ok( set( G.dsitr( V[2] ) ).isequal( [ V[0] , V[4] ] ) ) ;
	ok( set( G.dsitr( V[3] ) ).isequal( [ V[0] , V[4] ] ) ) ;
	ok( set( G.dsitr( V[4] ) ).isequal( [ ] ) ) ;
	ok( set( G.dsitr( V[5] ) ).isequal( [ ] ) ) ;
	ok( set( G.dsitr( V[6] ) ).isequal( [ V[5] , V[9] ] ) ) ;
	ok( set( G.dsitr( V[7] ) ).isequal( [ V[5] , V[9] ] ) ) ;
	ok( set( G.dsitr( V[8] ) ).isequal( [ V[5] , V[9] ] ) ) ;
	ok( set( G.dsitr( V[9] ) ).isequal( [ ] ) ) ;

	ok( set( G.dpitr( V[0] ) ).isequal( [ V[1] , V[2] , V[3] ] ) ) ;
	ok( set( G.dpitr( V[1] ) ).isequal( [ ] ) ) ;
	ok( set( G.dpitr( V[2] ) ).isequal( [ ] ) ) ;
	ok( set( G.dpitr( V[3] ) ).isequal( [ ] ) ) ;
	ok( set( G.dpitr( V[4] ) ).isequal( [ V[1] , V[2] , V[3] ] ) ) ;
	ok( set( G.dpitr( V[5] ) ).isequal( [ V[6] , V[7] , V[8] ] ) ) ;
	ok( set( G.dpitr( V[6] ) ).isequal( [ ] ) ) ;
	ok( set( G.dpitr( V[7] ) ).isequal( [ ] ) ) ;
	ok( set( G.dpitr( V[8] ) ).isequal( [ ] ) ) ;
	ok( set( G.dpitr( V[9] ) ).isequal( [ V[6] , V[7] , V[8] ] ) ) ;

	deepEqual( cardinality.len( G.edges( ) ) , 15 , "G.edges( ) length" ) ;

	const edges = set( E ) ;

	for ( let [ u , v , e ] of G.edges( ) ) {

		ok( edges.has( e ) ) ;

		deepEqual( [ u , v ] , G.endpoints( e ) ) ;

		edges.remove( e ) ;

	}


	for ( let i of range( n ) ) {

		ok( all( map(([ u , v ]) => u === V[i] || v === V[i], G.incident( V[i] ) ) ) ) ;

		ok( set( map(([,,e]) => e, G.incident( V[i] )) ).isequal(
			chain( [
				map(([,,e]) => e, G.ingoing( V[i] )),
				map(([,,e]) => e, G.outgoing( V[i] ))
			] )
		) ) ;

		ok( set( map(([,v]) => v, G.incident( V[i] ) ) ).isequal(
			chain( [
				map(( [ , v ]) => v, G.ingoing( V[i] ) ) ,
				map(( [ , v ]) => v, G.outgoing( V[i] ) )
			] )
		) ) ;

		ok( set( map(([u]) => u, G.incident( V[i] ) ) ).isequal(
			chain( [
				map(([ u ]) => u, G.ingoing( V[i] ) ) ,
				map(([ u ]) => u, G.outgoing( V[i] ) )
			] )
		) ) ;

		ok( set( G.nitr( V[i] ) ).isequal( map(([ u , v ]) => u === V[i] ? v : u, G.incident( V[i] ) ) ) ) ;
		ok( set( G.dpitr( V[i] ) ).isequal( map(([ u ]) => u, G.ingoing( V[i] ) ) ) ) ;
		ok( set( G.dsitr( V[i] ) ).isequal( map(([ v ]) => v, G.outgoing( V[i] ) )) ) ;

	}

	delete_all_edges( ) ;

	deepEqual( cardinality.len( G.vitr( ) ) , 10 ) ;
	deepEqual( cardinality.len( G.eitr( ) ) , 0 ) ;

	delete_all_vertices( ) ;

	deepEqual( cardinality.len( G.vitr( ) ) , 0 ) ;
	deepEqual( cardinality.len( G.eitr( ) ) , 0 ) ;

} ) ;

} ;

exports.MultiDiGraph = MultiDiGraph ;
