'use strict';

describe('Controller: ChildrenCtrl', function () {

  // load the controller's module
  beforeEach(module('dayCampApp'));

  var ChildrenCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChildrenCtrl = $controller('ChildrenCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
