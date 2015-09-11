'use strict';

angular.module('dayCampApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/users', {
      	url: '/users',
        templateUrl: 'app/admin/users/users.html',
        controller: 'AdminUsersCtrl'
      })
      .when('/register', {
      	url: '/register',
        templateUrl: 'app/admin/register/register.html',
        controller: 'AdminRegisterCtrl'
      })
      .when('/checkin', {
        url: '/checkin',
        templateUrl: 'app/admin/checkin/checkin.html',
        controller: 'AdminCheckinCtrl'
      });
  });