'use strict';

//Setting up route
angular.module('kids').config(['$stateProvider',
	function($stateProvider) {
		// Kids state routing
		$stateProvider.
		state('listKids', {
			url: '/kids',
			templateUrl: 'modules/kids/views/list-kids.client.view.html'
		}).
		state('createKid', {
			url: '/kids/create',
			templateUrl: 'modules/kids/views/create-kid.client.view.html'
		}).
		state('viewKid', {
			url: '/kids/:kidId',
			templateUrl: 'modules/kids/views/view-kid.client.view.html'
		}).
		state('editKid', {
			url: '/kids/:kidId/edit',
			templateUrl: 'modules/kids/views/edit-kid.client.view.html'
		});
	}
]);