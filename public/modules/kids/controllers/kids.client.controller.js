'use strict';

// Kids controller
angular.module('kids').controller('KidsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Kids',
	function($scope, $stateParams, $location, Authentication, Kids) {
		$scope.authentication = Authentication;

		// Create new Kid
		$scope.create = function() {
			// Create new Kid object
			var kid = new Kids ({
				name: this.name
			});

			// Redirect after save
			kid.$save(function(response) {
				$location.path('kids/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Kid
		$scope.remove = function(kid) {
			if ( kid ) { 
				kid.$remove();

				for (var i in $scope.kids) {
					if ($scope.kids [i] === kid) {
						$scope.kids.splice(i, 1);
					}
				}
			} else {
				$scope.kid.$remove(function() {
					$location.path('kids');
				});
			}
		};

		// Update existing Kid
		$scope.update = function() {
			var kid = $scope.kid;

			kid.$update(function() {
				$location.path('kids/' + kid._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Kids
		$scope.find = function() {
			$scope.kids = Kids.query();
		};

		// Find existing Kid
		$scope.findOne = function() {
			$scope.kid = Kids.get({ 
				kidId: $stateParams.kidId
			});
		};
	}
]);