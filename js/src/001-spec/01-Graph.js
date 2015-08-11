
const Graph = function ( title , Constructor ) {

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
		set = new Set( map ( function ( e ) {
			let [ u , w ] = g.endpoints( e ) ;
			return u === v[0] ? w : u ;
		} , e[0] ) ) ;

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
		set = new Set( map ( function ( e ) {
			let [ u , w ] = g.endpoints( e ) ;
			return u === v[0] ? w : u ;
		} , e[0] ) ) ;

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

} ;

exports.Graph = Graph ;
