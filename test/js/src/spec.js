
var spec = graphspec ;

var dll = require( "aureooms-js-dll" ) ;

var adjacencylist = require( "aureooms-js-adjacency-list" ) ;
var adjacencymatrix = require( "aureooms-js-adjacency-matrix" ) ;

var List = dll.DoublyLinkedList ;

spec.Graph( "Adjacency Matrix Graph" , adjacencymatrix.Graph ) ;
spec.MultiGraph( "Adjacency List MultiGraph" , adjacencylist.MultiGraph( List ) ) ;
spec.DiGraph( "Adjacency Matrix DiGraph" , adjacencymatrix.DiGraph ) ;
spec.MultiDiGraph( "Adjacency List MultiDiGraph" , adjacencylist.MultiDiGraph( List , Map ) ) ;
