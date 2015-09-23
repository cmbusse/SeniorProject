'use strict';

angular.module('dayCampApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, User) {
    $scope.user = {};
    $scope.errors = {};
    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        // PIN Setting
        var testPIN = 0;
        var PINFound = false;

        var i = 0;
        do{
          // Format the PIN so it is 4 digits
          testPIN = ("000" + i).slice(-4);
            // Check the PIN against every user in users for matches
            for(var j = 0; j < $scope.users.length; j++){
              // If the PIN matches a user, move on to the next try
              if($scope.users[j].PIN === testPIN){
                break;
              }
              // If we have checked it against every user and there were no matches
              // we have found a good PIN
              if(j === ($scope.users.length-1)){
                PINFound = true;
              }
            }
            i++;
        }
        while (i < 9999 && PINFound != true)            

        Auth.createUser({
          firstName: $scope.user.firstName,
          lastName: $scope.user.lastName,
          email: $scope.user.email,
          password: $scope.user.password,
          phone: $scope.user.phone,
          numChildren: $scope.user.numChildren,
          PIN: testPIN
        })
        .then( function() {
          // Account created, redirect to add children page
          $location.path('/children');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

  });


/*
Try 0002 against them all, if found, go to next number
Try 0003 against them all, if found, go to next number
Keep trying a new number against them all until a PIN is found that isn't
associated with an account, assign that pin to that account


User - PIN
1 - 0001
2 - 0002
3 - ?

*/