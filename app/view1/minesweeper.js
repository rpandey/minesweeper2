'use strict';

angular.module('myApp.minesweeper', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/minesweeper', {
            templateUrl: 'view1/minesweeper.html',
            controller: 'MinesweeperController'
        });
    }])
    .controller('MinesweeperController', ['$scope', function ($scope) {
        var minefield = {},
            minefieldWithFlagCount = [{
                position: {
                    row: 0,
                    column: 0
                },
                count: 0
            }],
            levelOfDiff = {},
            max = 3;

       // $scope.itemList = [];
        $scope.options = ['easy', 'medium', 'hard'];
        $scope.selectedLevel= 'easy';
        //$scope.levels = [{id: "easy", name: "easy"}, {id: "medium", name: "medium"}, {id: "hard", name: "hard"}];
        console.log("options",$scope.options,"levels:",$scope.levels);

        $scope.changedValue = function (name) {

            if(!name) return false;
            minefield.rows.length = 0;
            $scope.init(name);
        };

        $scope.init = function (name) {
            name = name || 'easy';
            $scope.minefield = createMinefield();
            generateMinesWithLevel(name);
            for (var i = 0; i < max; i++) {
                for (var j = 0; j < max; j++) {
                    if (minefield.rows[i].places[j].content !== 'bomb') {
                        getBombCount(minefield, i, j);
                    }
                }
            }
        };

        var createMinefield = function () {
                minefield.rows = [];

                for (var i = 0; i < max; i++) {
                    var row = {};
                    row.places = [];

                    for (var j = 0; j < max; j++) {
                        var place = {};
                        place.content = "empty";
                        place.isCovered = true;
                        row.places.push(place);
                        // console.log(row.places[j].content);
                    }
                    minefield.rows.push(row);
                }
                return minefield;
            },

            createRandomMine = function () {
                var row,
                    column,
                    place,
                    randomRow = Math.round(Math.random() * max) - 1,
                    randomColumn = Math.round(Math.random() * max) - 1;
                row = (randomRow == -1 ? 0 : randomRow);
                column = (randomColumn == -1 ? 0 : randomColumn);
                place = getPlace(minefield, row, column);
                place.content = "bomb";
            },

            getPlace = function (minefield, row, column) {
                console.log("row: ", row, "column", column);
                var i, j,
                    rowMax = (row == max - 1 ? max - 1 : row + 1),
                    rowMin = (row == 0 ? 0 : row - 1),
                    colMin = (column == 0 ? 0 : column - 1),
                    colMax = (column == max - 1 ? max - 1 : column + 1),
                    countArr = [];

                for (i = rowMin; i < rowMax + 1; i++) {
                    var count = 0, countBomb = 0;
                    for (j = colMin; j < colMax + 1; j++) {
                        if (minefield.rows[i].places[j].content == 'empty') {
                            minefield.rows[i].places[j].content = count;
                        }
                    }
                }
                return minefield.rows[row].places[column];
            },

            getBombCount = function (minefield, row, column) {
                var rowMax = (row == max - 1 ? max - 1 : row + 1),
                    rowMin = (row == 0 ? 0 : row - 1),
                    colMin = (column == 0 ? 0 : column - 1),
                    colMax = (column == max - 1 ? max - 1 : column + 1),
                    i,
                    j,
                    count,
                    countBomb = 0;

                for (i = rowMin; i < rowMax + 1; i++) {
                    for (j = colMin; j < colMax + 1; j++) {
                        if (minefield.rows[i].places[j].content == 'bomb') {
                            countBomb++;
                        }
                    }
                }
                minefield.rows[row].places[column].content = countBomb;
                console.log("minefield.rows[" + row + "].places[" + column + "]: " + minefield.rows[row].places[column].content);
            },

            generateMinesWithLevel = function (levelOfDiff) {
                var maxLocal;
                switch (levelOfDiff) {
                    case 'easy':
                        maxLocal = max;
                        break;
                    case 'medium':
                        maxLocal = max + max / 2;
                        break;
                    case 'hard':
                        maxLocal = max * 2;
                        break;
                    default:
                        maxLocal = max;
                }
                for (var i = 0; i < maxLocal; i++) {
                    createRandomMine();
                }
            };
        $scope.init();
    }]);
