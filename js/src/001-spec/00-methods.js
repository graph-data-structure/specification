

const methods = function ( title , Constructor ) {

	test( "graph-spec : check existence of methods > " + title , function ( assert ) {

		assert.ok( type.isfunction( Constructor ) , "constructor" ) ;

		const G = new Constructor( ) ;

		assert.ok( type.isfunction( G.vadd ) , "vadd" ) ;
		assert.ok( type.isfunction( G.vdel ) , "vdel" ) ;
		assert.ok( type.isfunction( G.eadd ) , "eadd" ) ;
		assert.ok( type.isfunction( G.edel ) , "edel" ) ;
		assert.ok( G.vitr != null , "vitr" ) ;
		assert.ok( G.eitr != null , "eitr" ) ;
		assert.ok( G.iitr != null , "iitr" ) ;
		assert.ok( G.initr != null , "initr" ) ;
		assert.ok( G.outitr != null , "outitr" ) ;
		assert.ok( G.nitr != null , "nitr" ) ;
		assert.ok( G.dsitr != null , "dsitr" ) ;
		assert.ok( G.dpitr != null , "dpitr" ) ;
		assert.ok( G.vertices != null , "vertices" ) ;
		assert.ok( G.edges != null , "edges" ) ;
		assert.ok( G.incident != null , "incident" ) ;
		assert.ok( G.ingoing != null , "ingoing" ) ;
		assert.ok( G.outgoing != null , "outgoing" ) ;
		assert.ok( G.endpoints != null , "endpoints" ) ;
		assert.ok( G.reverse != null , "reverse" ) ;

	} ) ;

} ;

exports.methods = methods ;
