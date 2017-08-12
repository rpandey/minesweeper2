'use strict';

describe('myApp.minesweeper module', function() {
var scope,
    mineSweeperCtrl;

  beforeEach(module('myApp.minesweeper'),inject(function ($rootScope, $controller ) {
    scope = $rootScope.$new();
  }));

  describe('mineSweeperCtrl controller', function(){
    mineSweeperCtrl = function() {
      return $controller('mineSweeperCtrl', {
        $scope: scope
      });
    };
    it('should just check mineSweeperCtrl to be defined', inject(function($controller) {
      expect(mineSweeperCtrl).toBeDefined();
    }));
  });
});
