import test from 'ava';
import * as graphspec from '../../src';

var spec = graphspec ;

import dll from "@aureooms/js-dll" ;

import adjacencylist from "@aureooms/js-adjacency-list" ;
import adjacencymatrix from "@aureooms/js-adjacency-matrix" ;

var List = dll.DoublyLinkedList ;

spec.Graph( test, "Adjacency Matrix Graph" , adjacencymatrix.Graph ) ;
spec.MultiGraph( test, "Adjacency List MultiGraph" , adjacencylist.MultiGraph( List ) ) ;
spec.DiGraph( test, "Adjacency Matrix DiGraph" , adjacencymatrix.DiGraph ) ;
spec.MultiDiGraph( test, "Adjacency List MultiDiGraph" , adjacencylist.MultiDiGraph( List , Map ) ) ;
