'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Kid Schema
 */
var KidSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Kid name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Kid', KidSchema);