
var dll = require( "aureooms-js-dll" ) ;

var adjacencylist = require( "aureooms-js-adjacency-list" ) ;
var adjacencymatrix = require( "aureooms-js-adjacency-matrix" ) ;

graphspec.undirected1( "List" , adjacencylist.List( dll.DoublyLinkedList ) ) ;
graphspec.undirected2( "List" , adjacencylist.List( dll.DoublyLinkedList ) ) ;
graphspec.undirected1( "Matrix" , adjacencymatrix.Matrix ) ;
graphspec.undirected2( "Matrix" , adjacencymatrix.Matrix ) ;
