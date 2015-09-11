'use strict';

angular.module('dayCampApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if($cookieStore.get('token')) {
      currentUser = User.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      changeRole: function(newRole, changeUser, callback) {
        var cb = callback || angular.noop;

        return User.changeRole({id: 'admin' }, {
          newRole: newRole,
          id: changeUser._id
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      addChild: function(childName, callback) {
        var cb = callback || angular.noop;

        return User.addChild({ id: currentUser._id }, {
          childName: childName,
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      updateFinished: function(accountStatus, callback) {
        var cb = callback || angular.noop;

        return User.updateFinished({ id: currentUser._id }, {
          accountStatus: accountStatus,
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      isEmployee: function() {
        return currentUser.role === 'employee';
      },

      zeroChildren: function() {
        return currentUser.numChildren == '0';
      },

      oneChildren: function() {
        return currentUser.numChildren == '1';
      },

      twoChildren: function() {
        return currentUser.numChildren == '2';
      },

      threeChildren: function() {
        return currentUser.numChildren == '3';
      },

      fourChildren: function() {
        return currentUser.numChildren == '4';
      },

      fiveChildren: function() {
        return currentUser.numChildren == '5';
      },

      sixChildren: function() {
        return currentUser.numChildren == '6';
      },

      sevenChildren: function() {
        return currentUser.numChildren == '7';
      },

      eightChildren: function() {
        return currentUser.numChildren == '8';
      },

      nineChildren: function() {
        return currentUser.numChildren == '9';
      },

      accountFinished: function() {
        return currentUser.accountFinished;
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
