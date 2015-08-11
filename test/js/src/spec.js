
var spec = graphspec ;

var dll = require( "aureooms-js-dll" ) ;

var adjacencylist = require( "aureooms-js-adjacency-list" ) ;
var adjacencymatrix = require( "aureooms-js-adjacency-matrix" ) ;

var List = dll.DoublyLinkedList ;

spec.MultiDiGraph( "Adjacency List" , adjacencylist.MultiDiGraph( List , Map ) ) ;
spec.MultiGraph( "Adjacency List" , adjacencylist.MultiGraph( List ) ) ;
spec.Graph( "Adjacency Matrix" , adjacencymatrix.Graph ) ;
