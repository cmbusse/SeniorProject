'use strict';

angular.module('dayCampApp')
  .controller('ChildrenCtrl', function ($scope, Auth, User, $location) {
    $scope.oneChildren = Auth.oneChildren;
    $scope.twoChildren = Auth.twoChildren;
    $scope.threeChildren = Auth.threeChildren;
    $scope.fourChildren = Auth.fourChildren;
    $scope.fiveChildren = Auth.fiveChildren;
    $scope.sixChildren = Auth.sixChildren;
    $scope.sevenChildren = Auth.sevenChildren;
    $scope.eightChildren = Auth.eightChildren;
    $scope.nineChildren = Auth.nineChildren;
    $scope.accountFinished = Auth.accountFinished;

    $scope.users = User.query();
    $scope.errors = {};

    $scope.addChild = function(childName) {
        //var childName2 = "chris";
        Auth.addChild(childName.$modelValue)
        .then(function() {
            $scope.message = 'success';
        })
        .catch(function() {
            $scope.errors.others = 'can\'t do dat';
        });
    };

    $scope.updateFinished = function(accountStatus) {
        //var childName2 = "chris";
        Auth.updateFinished(accountStatus)
        .then(function() {
            $scope.message = 'success';
        })
        .catch(function() {
            $scope.errors.others = 'can\'t do dat';
        });
    };

    $scope.go = function( path ) {
        $location.path( path );
    }

    $scope.addChildrenOne = function(form) {
        // call addChild for each
        $scope.submitted = true;

        if(form.$valid) {
            $scope.addChild(form.childOne);
            $scope.updateFinished(true);
            $location.path( '/home' );
        }
    };

    $scope.addChildrenTwo = function(form) {
        // call addChild for each
        $scope.submitted = true;

        if(form.$valid) {
            $scope.addChild(form.childOne);
            $scope.addChild(form.childTwo);
            $scope.updateFinished(true);
            $location.path( '/home' );
        }
    };

    $scope.addChildrenThree = function(form) {
        // call addChild for each
        $scope.submitted = true;

        if(form.$valid) {
            $scope.addChild(form.childOne);
            $scope.addChild(form.childTwo);
            $scope.addChild(form.childThree);
            $scope.updateFinished(true);
            $location.path( '/home' );
        }
    };

    $scope.addChildrenFour = function(form) {
        // call addChild for each
        $scope.submitted = true;

        if(form.$valid) {
            $scope.addChild(form.childOne);
            $scope.addChild(form.childTwo);
            $scope.addChild(form.childThree);
            $scope.addChild(form.childFour);
            $scope.updateFinished(true);
            $location.path( '/home' );
        }
    };

    $scope.addChildrenFive = function(form) {
        // call addChild for each
        $scope.submitted = true;

        if(form.$valid) {
            $scope.addChild(form.childOne);
            $scope.addChild(form.childTwo);
            $scope.addChild(form.childThree);
            $scope.addChild(form.childFour);
            $scope.addChild(form.childFive);
            $scope.updateFinished(true);
            $location.path( '/home' );
        }
    };

    $scope.addChildrenSix = function(form) {
        // call addChild for each
        $scope.submitted = true;

        if(form.$valid) {
            $scope.addChild(form.childOne);
            $scope.addChild(form.childTwo);
            $scope.addChild(form.childThree);
            $scope.addChild(form.childFour);
            $scope.addChild(form.childFive);
            $scope.addChild(form.childSix);
            $scope.updateFinished(true);
            $location.path( '/home' );
        }
    };

    $scope.addChildrenSeven = function(form) {
        // call addChild for each
        $scope.submitted = true;

        if(form.$valid) {
            $scope.addChild(form.childOne);
            $scope.addChild(form.childTwo);
            $scope.addChild(form.childThree);
            $scope.addChild(form.childFour);
            $scope.addChild(form.childFive);
            $scope.addChild(form.childSix);
            $scope.addChild(form.childSeven);
            $scope.updateFinished(true);
            $location.path( '/home' );
        }
    };

    $scope.addChildrenEight = function(form) {
        // call addChild for each
        $scope.submitted = true;

        if(form.$valid) {
            $scope.addChild(form.childOne);
            $scope.addChild(form.childTwo);
            $scope.addChild(form.childThree);
            $scope.addChild(form.childFour);
            $scope.addChild(form.childFive);
            $scope.addChild(form.childSix);
            $scope.addChild(form.childSeven);
            $scope.addChild(form.childEight);
            $scope.updateFinished(true);
            $location.path( '/home' );
        }
    };

    $scope.addChildrenNine = function(form) {
        // call addChild for each
        $scope.submitted = true;

        if(form.$valid) {
            $scope.addChild(form.childOne);
            $scope.addChild(form.childTwo);
            $scope.addChild(form.childThree);
            $scope.addChild(form.childFour);
            $scope.addChild(form.childFive);
            $scope.addChild(form.childSix);
            $scope.addChild(form.childSeven);
            $scope.addChild(form.childEight);
            $scope.addChild(form.childNine);
            $scope.updateFinished(true);
            $location.path( '/home' );
        }
    };

    /*

    var changeRole = function(newRole, user) {
      Auth.changeRole(newRole, user)
        .then(function() {
          $scope.message = 'success';
        })
        .catch(function() {
          $scope.errors.others = 'can\'t do dat';
          $scope.message = '';
        });
    };

    */

  });
