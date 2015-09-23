'use strict';

//Kids service used to communicate Kids REST endpoints
angular.module('kids').factory('Kids', ['$resource',
	function($resource) {
		return $resource('kids/:kidId', { kidId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);