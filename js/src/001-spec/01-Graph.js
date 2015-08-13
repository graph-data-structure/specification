
const Graph = function ( title , Constructor ) {

	test( "graph-spec : Graph simple test > " + title , function ( assert ) {

		const G = new Constructor( ) ;

		const u = G.vadd( ) ;
		const v = G.vadd( ) ;

		const uv = G.eadd( u , v ) ;

		assert.ok( set( [ u , v ] ).isequal( G.vitr( ) ) ) ;
		let [ a , b ] = G.edges( ).next( ).value ;
		assert.ok( set( [ a , b ] ).isequal( [ u , v ] ) ) ;

		G.reverse( ) ;

		assert.ok( set( [ u , v ] ).isequal( G.vitr( ) ) ) ;
		assert.equal( G.eitr( ).next( ).value , uv ) ;
		[ a , b ] = G.edges( ).next( ).value ;
		assert.ok( set( [ a , b ] ).isequal( [ u , v ] ) ) ;

		const vu = G.eadd( v , u ) ;
		assert.deepEqual( cardinality.len( G.eitr( ) ) , 1 ) ;
		assert.equal( uv , vu ) ;

		G.edel( uv ) ;
		assert.deepEqual( cardinality.len( G.eitr( ) ) , 0 ) ;

		G.vdel( u ) ;
		G.vdel( v ) ;
		assert.deepEqual( cardinality.len( G.vitr( ) ) , 0 ) ;

	} ) ;



	test( "graph-spec : Graph #1 > " + title , function ( ) {

		var g = new Constructor( ) ;

		var v = [ ] ;
		var e = [ ] ;

		var n = 11 ;

		for( var i = 0 ; i < n ; ++i ) v[i] = g.vadd( i ) ;

		e[1] = [ ] ;
		e[1][0] = g.eadd(v[1], v[9]);
		e[0] = [ ] ;
		e[0][0] = g.eadd(v[0], v[10]);
		e[0][1] = g.eadd(v[0], v[5]);
		e[0][2] = g.eadd(v[0], v[3]);
		e[0][3] = g.eadd(v[0], v[1]);
		e[0][4] = g.eadd(v[0], v[0]);
		e[1][1] = e[0][3];
		e[4] = [ ] ;
		e[4][0] = g.eadd(v[4], v[7]);

		var r = [ 0 , 1 , 4 ] ;

		// tests

		var k , set , alledges ;

		k = 0 ;
		set = new Set( v ) ;

		ex( map( function ( j ) {
			ok( set.has( j ) , 'vitr ' + k ) ;
			set.delete( j ) ;
			++k ;
		} , g.vitr( ) ) ) ;

		k = 0 ;
		alledges = e[0].concat( [ e[1][0] ] ).concat( e[4] ) ;
		set = new Set( alledges ) ;

		ex( map( function ( j ) {
			ok( set.has( j ) , 'eitr ' + k ) ;
			set.delete( j ) ;
			++k ;
		} , g.eitr( ) ) ) ;

		deepEqual( k , alledges.length , 'check edges count before del' ) ;



		r.forEach( function ( m ) {

			var k = e[m].length ;

			var set = new Set( e[m] ) ;

			ex( map( function ( x ) {
				--k ;
				ok( set.has( x ) , 'iitr ' + m + ' ' + k ) ;
				set.delete( x ) ;
			} , g.iitr( v[m] ) ) ) ;

		} ) ;


		// delete edges 1 0 , 0 2 , 4 0
		g.edel(e[1].splice(0, 1)[0]);

		g.edel(e[0].splice(2, 1)[0]);

		g.edel(e[4].splice(0, 1)[0]);

		k = 0 ;
		alledges = e[0].concat( e[4] ) ;
		set = new Set( alledges ) ;

		ex( map( function ( j ) {
			ok( set.has( j ) , 'eitr ' + k ) ;
			set.delete( j ) ;
			++k ;
		} , g.eitr( ) ) ) ;

		deepEqual( k , alledges.length , 'check edges count after del' ) ;

		k = 0 ;
		set = new Set( map( ( e ) => g.endpoints( e )[1] , e[0] ) ) ;

		ex( map( function ( j ) {
			ok( set.has( j ) , 'nitr ' + k ) ;
			set.delete( j ) ;
			++k ;
		} , g.nitr( v[0] ) ) ) ;

		deepEqual( k , e[0].length , 'check neighbour count after del' ) ;

		r.forEach( function ( m ) {

			var k = e[m].length ;

			var set = new Set( e[m] ) ;

			ex( map( function ( x ) {
				--k ;
				ok( set.has( x ) , 'iitr ' + m + ' ' + k ) ;
				set.delete( x ) ;
			} , g.iitr( v[m] ) ) ) ;

		} ) ;

		// delete vertex 3

		g.vdel(v.splice(3, 1)[0]);

		k = 0 ;
		set = new Set( v ) ;

		ex( map( function ( j ) {
			ok( set.has( j ) , 'vitr ' + k ) ;
			set.delete( j ) ;
			++k ;
		} , g.vitr( ) ) ) ;

		deepEqual( k , v.length , 'check vertex count after del' ) ;

		e[0].splice(2, 1);

		// delete remaining edges
		r.forEach( function ( m ) {
			while ( e[m].length ) g.edel( e[m].splice( 0 , 1 )[0] ) ;
		} ) ;

		ok( cardinality.empty( g.eitr( ) ) , "no more edges" ) ;

		ok( all( [ for ( i of g.vitr( ) ) cardinality.empty( g.iitr( i ) ) ] ) , "no more incident edges" ) ;

		// delete remaining vertices
		while ( v.length ) g.vdel(v.splice(0, 1)[0]) ;

		ok( cardinality.empty( g.vitr( ) ) , "no more vertices" ) ;

	});

	test( "graph-spec : Graph #2 > " + title , function ( ) {

		var g = new Constructor( ) ;

		var v = [ ] ;
		var e = [ ] ;

		var n = 11 ;

		for( var i = 0 ; i < n ; ++i ) v[i] = g.vadd( i ) ;

		e[1] = [ ] ;
		e[1][0] = g.eadd(v[1], v[9]);
		e[0] = [ ] ;
		e[0][0] = g.eadd(v[0], v[10]);
		e[0][1] = g.eadd(v[0], v[5]);
		e[0][2] = g.eadd(v[0], v[3]);
		e[0][3] = g.eadd(v[0], v[1]);
		e[0][4] = g.eadd(v[0], v[0]);
		e[1][1] = e[0][3];
		e[4] = [ ] ;
		e[4][0] = g.eadd(v[4], v[7]);

		var r = [ 0 , 1 , 4 ] ;

		// tests

		var k , set , alledges ;

		k = 0 ;
		set = new Set( v ) ;

		ex( map( function ( j ) {
			ok( set.has( j ) , 'vitr ' + k ) ;
			set.delete( j ) ;
			++k ;
		} , g.vitr( ) ) ) ;

		k = 0 ;
		alledges = e[0].concat( [ e[1][0] ] ).concat( e[4] ) ;
		set = new Set( alledges ) ;

		ex( map( function ( j ) {
			ok( set.has( j ) , 'eitr ' + k ) ;
			set.delete( j ) ;
			++k ;
		} , g.eitr( ) ) ) ;

		deepEqual( k , alledges.length , 'check edges count before del' ) ;



		r.forEach( function ( m ) {

			var k = e[m].length ;

			var set = new Set( e[m] ) ;

			ex( map( function ( x ) {
				--k ;
				ok( set.has( x ) , 'iitr ' + m + ' ' + k ) ;
				set.delete( x ) ;
			} , g.iitr( v[m] ) ) ) ;

		} ) ;


		// delete edges 1 0 , 0 2 , 4 0
		g.edel(e[1].splice(0, 1)[0]);

		g.edel(e[0].splice(2, 1)[0]);

		g.edel(e[4].splice(0, 1)[0]);

		k = 0 ;
		alledges = e[0].concat( e[4] ) ;
		set = new Set( alledges ) ;

		ex( map( function ( j ) {
			ok( set.has( j ) , 'eitr ' + k ) ;
			set.delete( j ) ;
			++k ;
		} , g.eitr( ) ) ) ;

		deepEqual( k , alledges.length , 'check edges count after del' ) ;

		k = 0 ;
		set = new Set( map( ( e ) => g.endpoints( e )[1] , e[0] ) ) ;

		ex( map( function ( j ) {
			ok( set.has( j ) , 'nitr ' + k ) ;
			set.delete( j ) ;
			++k ;
		} , g.nitr( v[0] ) ) ) ;

		deepEqual( k , e[0].length , 'check neighbour count after del' ) ;

		r.forEach( function ( m ) {

			var k = e[m].length ;

			var set = new Set( e[m] ) ;

			ex( map( function ( x ) {
				--k ;
				ok( set.has( x ) , 'iitr ' + m + ' ' + k ) ;
				set.delete( x ) ;
			} , g.iitr( v[m] ) ) ) ;

		} ) ;

		// delete vertex 10

		g.vdel(v.splice(10, 1)[0]);
		e[0].splice(0, 1);

		k = 0 ;
		set = new Set( v ) ;

		ex( map( function ( j ) {
			ok( set.has( j ) , 'vitr ' + k ) ;
			set.delete( j ) ;
			++k ;
		} , g.vitr( ) ) ) ;

		deepEqual( k , v.length , 'check vertex count after del' ) ;

		e[0].splice(1, 1);

		// delete remaining edges
		r.forEach( function ( m ) {
			while ( e[m].length ) g.edel( e[m].splice( 0 , 1 )[0] ) ;
		} ) ;


		ok( cardinality.empty( g.eitr( ) ) , "no more edges" ) ;

		ok( all( [ for ( i of g.vitr( ) ) cardinality.empty( g.iitr( i ) ) ] ) , "no more incident edges" ) ;

		// delete remaining vertices
		while ( v.length ) g.vdel(v.splice(0, 1)[0]) ;

		ok( cardinality.empty( g.vitr( ) ) , "no more vertices" ) ;

	});

test( "graph-spec : Graph extensive test > " + title , function ( ) {

	const G = new Constructor( ) ;

	const n = 10 ;

	let V , E ;

	const init = function ( ) {

		const V = [ for ( i of range( n ) ) G.vadd( i ) ] ;

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
	deepEqual( cardinality.len( G.eitr( ) ) , 12 ) ;

	delete_all_edges( ) ;

	deepEqual( cardinality.len( G.vitr( ) ) , 10 ) ;
	deepEqual( cardinality.len( G.eitr( ) ) , 0 ) ;

	delete_all_vertices( ) ;

	deepEqual( cardinality.len( G.vitr( ) ) , 0 ) ;
	deepEqual( cardinality.len( G.eitr( ) ) , 0 ) ;

	[ V , E ] = init( ) ;

	deepEqual( cardinality.len( G.vitr( ) ) , 10 ) ;
	deepEqual( cardinality.len( G.eitr( ) ) , 12 ) ;

	delete_all_vertices( ) ;

	deepEqual( cardinality.len( G.vitr( ) ) , 0 ) ;
	deepEqual( cardinality.len( G.eitr( ) ) , 0 ) ;

	[ V , E ] = init( ) ;

	deepEqual( cardinality.len( G.iitr( V[0] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[1] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[2] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[3] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[4] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[5] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[6] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[7] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[8] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[9] ) ) , 3 ) ;

	deepEqual( cardinality.len( G.initr( V[0] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.initr( V[1] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.initr( V[2] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.initr( V[3] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.initr( V[4] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.initr( V[5] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.initr( V[6] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.initr( V[7] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.initr( V[8] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.initr( V[9] ) ) , 3 ) ;

	deepEqual( cardinality.len( G.outitr( V[0] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.outitr( V[1] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.outitr( V[2] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.outitr( V[3] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.outitr( V[4] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.outitr( V[5] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.outitr( V[6] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.outitr( V[7] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.outitr( V[8] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.outitr( V[9] ) ) , 3 ) ;

	G.reverse( ) ;

	deepEqual( cardinality.len( G.iitr( V[0] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[1] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[2] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[3] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[4] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[5] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.iitr( V[6] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[7] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[8] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.iitr( V[9] ) ) , 3 ) ;

	deepEqual( cardinality.len( G.outitr( V[0] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.outitr( V[1] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.outitr( V[2] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.outitr( V[3] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.outitr( V[4] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.outitr( V[5] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.outitr( V[6] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.outitr( V[7] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.outitr( V[8] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.outitr( V[9] ) ) , 3 ) ;

	deepEqual( cardinality.len( G.initr( V[0] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.initr( V[1] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.initr( V[2] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.initr( V[3] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.initr( V[4] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.initr( V[5] ) ) , 3 ) ;
	deepEqual( cardinality.len( G.initr( V[6] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.initr( V[7] ) ) , 2 ) ;
	deepEqual( cardinality.len( G.initr( V[8] ) ) , 2 ) ;
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

	ok( set( G.dsitr( V[0] ) ).isequal( [ V[1] , V[2] , V[3] ] ) ) ;
	ok( set( G.dsitr( V[1] ) ).isequal( [ V[0] , V[4] ] ) ) ;
	ok( set( G.dsitr( V[2] ) ).isequal( [ V[0] , V[4] ] ) ) ;
	ok( set( G.dsitr( V[3] ) ).isequal( [ V[0] , V[4] ] ) ) ;
	ok( set( G.dsitr( V[4] ) ).isequal( [ V[1] , V[2] , V[3] ] ) ) ;
	ok( set( G.dsitr( V[5] ) ).isequal( [ V[6] , V[7] , V[8] ] ) ) ;
	ok( set( G.dsitr( V[6] ) ).isequal( [ V[5] , V[9] ] ) ) ;
	ok( set( G.dsitr( V[7] ) ).isequal( [ V[5] , V[9] ] ) ) ;
	ok( set( G.dsitr( V[8] ) ).isequal( [ V[5] , V[9] ] ) ) ;
	ok( set( G.dsitr( V[9] ) ).isequal( [ V[6] , V[7] , V[8] ] ) ) ;

	ok( set( G.dpitr( V[0] ) ).isequal( [ V[1] , V[2] , V[3] ] ) ) ;
	ok( set( G.dpitr( V[1] ) ).isequal( [ V[0] , V[4] ] ) ) ;
	ok( set( G.dpitr( V[2] ) ).isequal( [ V[0] , V[4] ] ) ) ;
	ok( set( G.dpitr( V[3] ) ).isequal( [ V[0] , V[4] ] ) ) ;
	ok( set( G.dpitr( V[4] ) ).isequal( [ V[1] , V[2] , V[3] ] ) ) ;
	ok( set( G.dpitr( V[5] ) ).isequal( [ V[6] , V[7] , V[8] ] ) ) ;
	ok( set( G.dpitr( V[6] ) ).isequal( [ V[5] , V[9] ] ) ) ;
	ok( set( G.dpitr( V[7] ) ).isequal( [ V[5] , V[9] ] ) ) ;
	ok( set( G.dpitr( V[8] ) ).isequal( [ V[5] , V[9] ] ) ) ;
	ok( set( G.dpitr( V[9] ) ).isequal( [ V[6] , V[7] , V[8] ] ) ) ;

	deepEqual( cardinality.len( G.edges( ) ) , 12 , "G.edges( ) length" ) ;

	const edges = set( E ) ;

	for ( let [ u , v , e ] of G.edges( ) ) {

		ok( edges.has( e ) ) ;

		ok( set( [ u , v ] ).isequal( G.endpoints( e ) ) ) ;

		edges.remove( e ) ;

	}


	for ( let i of range( n ) ) {

		ok( all( [ for ( [ u , v ] of G.incident( V[i] ) ) u === V[i] || v === V[i] ] ) ) ;

		ok( set( [ for ( [ u , v , e ] of G.incident( V[i] ) ) e ] ).isequal(
			chain( [
				[ for ( [ u , v , e ] of G.ingoing( V[i] ) ) e ] ,
				[ for ( [ u , v , e ] of G.outgoing( V[i] ) ) e ]
			] )
		) ) ;

		ok( set( chain( [
			[ for ( [ u , v ] of G.incident( V[i] ) ) v ] ,
			[ for ( [ u , v ] of G.incident( V[i] ) ) u ]
		] ) ).isequal(
			chain( [
				[ V[i] ] ,
				[ for ( [ u , v ] of G.ingoing( V[i] ) ) u ] ,
				[ for ( [ u , v ] of G.outgoing( V[i] ) ) v ]
			] )
		) ) ;


		ok( set( G.nitr( V[i] ) ).isequal( [ for ( [ u , v ] of G.incident( V[i] ) ) u === V[i] ? v : u ] ) ) ;
		ok( set( G.dpitr( V[i] ) ).isequal( [ for ( [ u , v ] of G.ingoing( V[i] ) ) u ] ) ) ;
		ok( set( G.dsitr( V[i] ) ).isequal( [ for ( [ u , v ] of G.outgoing( V[i] ) ) v ] ) ) ;

	}

	delete_all_edges( ) ;

	deepEqual( cardinality.len( G.vitr( ) ) , 10 ) ;
	deepEqual( cardinality.len( G.eitr( ) ) , 0 ) ;

	delete_all_vertices( ) ;

	deepEqual( cardinality.len( G.vitr( ) ) , 0 ) ;
	deepEqual( cardinality.len( G.eitr( ) ) , 0 ) ;

} ) ;

} ;

exports.Graph = Graph ;
