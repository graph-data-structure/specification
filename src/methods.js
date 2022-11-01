import {isfunction} from "@aureooms/js-type" ;

export default function methods ( test, title , Constructor ) {

	test( "graph-spec : check existence of methods > " + title , function ( t ) {

		t.true( isfunction( Constructor ) , "constructor" ) ;

		const G = new Constructor( ) ;

		t.true( isfunction( G.vadd ) , "vadd" ) ;
		t.true( isfunction( G.vdel ) , "vdel" ) ;
		t.true( isfunction( G.eadd ) , "eadd" ) ;
		t.true( isfunction( G.edel ) , "edel" ) ;
		t.true( G.vitr != null , "vitr" ) ;
		t.true( G.eitr != null , "eitr" ) ;
		t.true( G.iitr != null , "iitr" ) ;
		t.true( G.initr != null , "initr" ) ;
		t.true( G.outitr != null , "outitr" ) ;
		t.true( G.nitr != null , "nitr" ) ;
		t.true( G.dsitr != null , "dsitr" ) ;
		t.true( G.dpitr != null , "dpitr" ) ;
		t.true( G.vertices != null , "vertices" ) ;
		t.true( G.edges != null , "edges" ) ;
		t.true( G.incident != null , "incident" ) ;
		t.true( G.ingoing != null , "ingoing" ) ;
		t.true( G.outgoing != null , "outgoing" ) ;
		t.true( G.endpoints != null , "endpoints" ) ;
		t.true( G.reverse != null , "reverse" ) ;

	} ) ;

}

