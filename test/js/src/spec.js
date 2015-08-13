
var spec = graphspec ;

var dll = require( "aureooms-js-dll" ) ;

var adjacencylist = require( "aureooms-js-adjacency-list" ) ;
var adjacencymatrix = require( "aureooms-js-adjacency-matrix" ) ;

var List = dll.DoublyLinkedList ;

spec.Graph( "Adjacency Matrix" , adjacencymatrix.Graph ) ;
spec.MultiGraph( "Adjacency List" , adjacencylist.MultiGraph( List ) ) ;
spec.DiGraph( "Adjacency Matrix" , adjacencymatrix.DiGraph ) ;
spec.MultiDiGraph( "Adjacency List" , adjacencylist.MultiDiGraph( List , Map ) ) ;
