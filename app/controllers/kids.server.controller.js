'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Kid = mongoose.model('Kid'),
	_ = require('lodash');

/**
 * Create a Kid
 */
exports.create = function(req, res) {
	var kid = new Kid(req.body);
	kid.user = req.user;

	kid.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(kid);
		}
	});
};

/**
 * Show the current Kid
 */
exports.read = function(req, res) {
	res.jsonp(req.kid);
};

/**
 * Update a Kid
 */
exports.update = function(req, res) {
	var kid = req.kid ;

	kid = _.extend(kid , req.body);

	kid.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(kid);
		}
	});
};

/**
 * Delete an Kid
 */
exports.delete = function(req, res) {
	var kid = req.kid ;

	kid.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(kid);
		}
	});
};

/**
 * List of Kids
 */
exports.list = function(req, res) { 
	Kid.find().sort('-created').populate('user', 'displayName').exec(function(err, kids) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(kids);
		}
	});
};

/**
 * Kid middleware
 */
exports.kidByID = function(req, res, next, id) { 
	Kid.findById(id).populate('user', 'displayName').exec(function(err, kid) {
		if (err) return next(err);
		if (! kid) return next(new Error('Failed to load Kid ' + id));
		req.kid = kid ;
		next();
	});
};

/**
 * Kid authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.kid.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
