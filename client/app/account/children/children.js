'use strict';

angular.module('dayCampApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/children', {
        templateUrl: 'app/account/children/children.html',
        controller: 'ChildrenCtrl'
      });
  });
