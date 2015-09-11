'use strict';

angular.module('dayCampApp')
  .controller('CheckinCtrl', function ($scope, Auth) {
  	$scope.isAdmin = Auth.isAdmin;
    $scope.message = 'Hello';
  });
