'use strict';

angular.module('dayCampApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/checkin', {
        templateUrl: 'app/admin/checkin/checkin.html',
        controller: 'CheckinCtrl'
      });
  });
