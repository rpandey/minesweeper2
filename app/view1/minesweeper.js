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
          max=5,
          flagPosBombCount=[];

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
               // console.log(row.spots[j].content);
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
                    colMax=(column==max-1?max-1:column+1),
                    countArr=[];

              for(i=rowMin;i<rowMax+1;i++){
                  var count=0,countBomb=0;
                  for(j=colMin;j< colMax+1; j++){
                      if(minefield.rows[i].spots[j].content=='empty'){
                          minefield.rows[i].spots[j].content=count;
                      }
                  }
              }
            return minefield.rows[row].spots[column];
          },

          getBombCount = function(minefield, row, column){
              var rowMax=(row==max-1 ?max-1:row+1),
                  rowMin=(row==0 ?0:row-1),
                  colMin=(column==0?0:column-1),
                  colMax=(column==max-1?max-1:column+1),
                  i,
                  j,
                  count,
                  countBomb=0;

                for(i=rowMin;i<rowMax+1;i++){
                    for(j=colMin;j< colMax+1; j++){
                        if(minefield.rows[i].spots[j].content=='bomb'){
                            countBomb++;
                        }
                    }
                }
              minefield.rows[row].spots[column].content=countBomb;
              console.log("minefield.rows["+row+"].spots["+column+"]: "+minefield.rows[row].spots[column].content);
              flagPosBombCount.push({
                  row:row,
                  column:column,
                  count:countBomb
              });
        };

      $scope.minefield = createMinefield();
      for(var i=0;i<max+2;i++) {
        createRandomMine();
      }
      console.log(flagPosBombCount);
      for (var i=0;i<max;i++){
          for(var j=0;j<max;j++) {
              if(minefield.rows[i].spots[j].content!=='bomb'){
                  getBombCount(minefield, i, j);
              }
          }
      }
        $scope.flagPosBombCount=flagPosBombCount;
    }]);
