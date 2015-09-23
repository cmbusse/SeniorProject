'use strict';

// Configuring the Articles module
angular.module('kids').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Kids', 'kids', 'dropdown', '/kids(/create)?');
		Menus.addSubMenuItem('topbar', 'kids', 'List Kids', 'kids');
		Menus.addSubMenuItem('topbar', 'kids', 'New Kid', 'kids/create');
	}
]);