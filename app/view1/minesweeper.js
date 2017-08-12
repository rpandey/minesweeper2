'use strict';

angular.module('myApp.minesweeper', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/minesweeper', {
    templateUrl: 'view1/minesweeper.html',
    controller: 'MinesweeperController'
  });
}])

.controller('MinesweeperController', ['$scope', function($scope) {
  var minefield = {};
  var createMinefield = function() {

      minefield.rows = [];

      for(var i = 0; i < 9; i++) {
        var row = {};
        row.spots = [];

        for(var j = 0; j < 9; j++) {
          var spot = {};
          spot.content = "empty";
          spot.isCovered = true;
          row.spots.push(spot);
        }

        minefield.rows.push(row);
      }
      //alert(minefield);
      return minefield;
    },
    createRandomMine = function() {
      var row,
          column,
          spot;
      row = Math.round(Math.random()*8);
      column = Math.round(Math.random()*8);
      spot= getSpot(minefield, row, column);
      spot.content = "bomb";
    },
     getSpot =  function(minefield, row, column) {
      return minefield.rows[row].spots[column];
    };

$scope.minefield = createMinefield();
  for(var i=0;i<9;i++) {
    createRandomMine();
  }

}]);
