'use strict';

angular.module('myApp.minesweeper', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/minesweeper', {
        templateUrl: 'view1/minesweeper.html',
        controller: 'MinesweeperController'
      });
    }])
    .controller('MinesweeperController', ['$scope', function($scope) {
      var minefield = {},
          hello,
          minefieldWithFlagCount=[{
            position:{
              row:0,
              column:0
            },
            count:0
          }],
          max=5;

      var createMinefield = function() {
            minefield.rows = [];

            for(var i = 0; i < max; i++) {
              var row = {};
              row.spots = [];

              for(var j = 0; j < max; j++) {
                var spot = {};
                spot.content = "empty";
                spot.isCovered = true;
                row.spots.push(spot);
                console.log(row.spots[j].content);
              }minefield.rows.push(row);
            }
          return minefield;
          },

          createRandomMine = function() {
            var row,
                column,
                spot,
                randomRow=Math.round(Math.random()*max)-1,
                randomColumn=Math.round(Math.random()*max)-1;
            row = (randomRow==-1?0:randomRow);
            column = (randomColumn==-1?0:randomColumn);
            spot= getSpot(minefield, row, column);
            spot.content = "bomb";
          },

          getSpot =  function(minefield, row, column) {
            console.log("row: ",row,"column",column);
                var i,j,
                    rowMax=(row==max-1 ?max-1:row+1),
                    rowMin=(row==0 ?0:row-1),
                    colMin=(column==0?0:column-1),
                    colMax=(column==max-1?max-1:column+1);
                for(i=rowMin;i<rowMax+1;i++){
                    for(j=colMin;j< colMax+1; j++){
                        if(minefield.rows[i].spots[j].content=='empty'){
                            minefield.rows[i].spots[j].content="sumNum";
                        }
                    }
                }
            return minefield.rows[row].spots[column];
          };

         /* createFlags = function (row, column) {
            var i,
                j;

              for(i=(row==0 ?0:row-1);i< column +1 && i >0 && i<3; i++) {

                for(j=column;j< row-1 && j >0 && j<3; j--) {
                  minefieldWithFlagCount.push({
                    position:{
                      row:i,
                      column:j
                    },
                     count:0
                  });
                }
              }
          }*/

      $scope.minefield = createMinefield();
      for(var i=0;i<max;i++) {
        createRandomMine();
      }
    }]);
