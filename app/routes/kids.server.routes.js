'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var kids = require('../../app/controllers/kids.server.controller');

	// Kids Routes
	app.route('/kids')
		.get(kids.list)
		.post(users.requiresLogin, kids.create);

	app.route('/kids/:kidId')
		.get(kids.read)
		.put(users.requiresLogin, kids.hasAuthorization, kids.update)
		.delete(users.requiresLogin, kids.hasAuthorization, kids.delete);

	// Finish by binding the Kid middleware
	app.param('kidId', kids.kidByID);
};
