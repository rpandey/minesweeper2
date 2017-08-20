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
          max=3;

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

               /* minefieldWithFlagCount.push({
                  position:{
                    row:0,
                    column:0
                  },
                  count:0
                })*/
                //console.log("i: ",i, "j: ",j);
              }minefield.rows.push(row);
            }



            //alert(minefield);
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
              //console.log("row: ",row,"randomRow:",randomRow,"column:",column,"randomColumn:",randomColumn);
            spot= getSpot(minefield, row, column);
            spot.content = "bomb";
            //createFlags(row,column);
            /*if(row !=0) {
              spot.previous=row-1;
            }
            if(row != 3) {
              spot.next=row+1;
            }*/
            // /console.log(spot);
          },
          getSpot =  function(minefield, row, column) {
            console.log("row: ",row,"column",column);
           // if(row>0 && column>0 && column <3 && row <3){
                var i,j;
                for(i=(row==0 ?0:row-1);i<(row==max-1 ?max:row+1);i++){
                    for(j=(column==0?0:column-1);j< (column==max-1?max:column+1); j++){
                        if(minefield.rows[i].spots[j].content=='empty'){
                            minefield.rows[i].spots[j].content="sumNum";
                        }
                    }
                }

            //}
            return minefield.rows[row].spots[column];
          },
          createFlags = function (row, column) {
            var i,
                j;

              for(i=(row==0 ?0:row-1);i< column +1 && i >0 && i<3; i++) {

                for(j=column;j< row-1 && j >0 && j<3; j--) {

                /*  if((minefieldWithFlagCount[i].position.row == i) && (minefieldWithFlagCount[i].position.column == j)){
                    minefieldWithFlagCount[i].count++;
                  }
                  else {
                    minefieldWithFlagCount[i].count=1;
                  }*/
                  minefieldWithFlagCount.push({
                    position:{
                      row:i,
                      column:j
                    },
                     count:0
                  });
                  //console.log("i: ",i, "j: ",j);
                }
              }

          }

      $scope.minefield = createMinefield();
      for(var i=0;i<max;i++) {
        createRandomMine();
      }
      console.log(minefieldWithFlagCount);
      console.log("hello");
    }]);
