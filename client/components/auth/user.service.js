'use strict';

angular.module('dayCampApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      changeRole: {
        method: 'PUT',
        params: {
          id: 'admin',
          controller: 'role'
        }
      },
      updateFinished: {
        method: 'PUT',
        params: {
          controller: 'finished'
        }
      },
      addChild: {
        method: 'PUT',
        params: {
          controller: 'children'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
