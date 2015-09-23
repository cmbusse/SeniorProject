'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Kid = mongoose.model('Kid'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, kid;

/**
 * Kid routes tests
 */
describe('Kid CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Kid
		user.save(function() {
			kid = {
				name: 'Kid Name'
			};

			done();
		});
	});

	it('should be able to save Kid instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Kid
				agent.post('/kids')
					.send(kid)
					.expect(200)
					.end(function(kidSaveErr, kidSaveRes) {
						// Handle Kid save error
						if (kidSaveErr) done(kidSaveErr);

						// Get a list of Kids
						agent.get('/kids')
							.end(function(kidsGetErr, kidsGetRes) {
								// Handle Kid save error
								if (kidsGetErr) done(kidsGetErr);

								// Get Kids list
								var kids = kidsGetRes.body;

								// Set assertions
								(kids[0].user._id).should.equal(userId);
								(kids[0].name).should.match('Kid Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Kid instance if not logged in', function(done) {
		agent.post('/kids')
			.send(kid)
			.expect(401)
			.end(function(kidSaveErr, kidSaveRes) {
				// Call the assertion callback
				done(kidSaveErr);
			});
	});

	it('should not be able to save Kid instance if no name is provided', function(done) {
		// Invalidate name field
		kid.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Kid
				agent.post('/kids')
					.send(kid)
					.expect(400)
					.end(function(kidSaveErr, kidSaveRes) {
						// Set message assertion
						(kidSaveRes.body.message).should.match('Please fill Kid name');
						
						// Handle Kid save error
						done(kidSaveErr);
					});
			});
	});

	it('should be able to update Kid instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Kid
				agent.post('/kids')
					.send(kid)
					.expect(200)
					.end(function(kidSaveErr, kidSaveRes) {
						// Handle Kid save error
						if (kidSaveErr) done(kidSaveErr);

						// Update Kid name
						kid.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Kid
						agent.put('/kids/' + kidSaveRes.body._id)
							.send(kid)
							.expect(200)
							.end(function(kidUpdateErr, kidUpdateRes) {
								// Handle Kid update error
								if (kidUpdateErr) done(kidUpdateErr);

								// Set assertions
								(kidUpdateRes.body._id).should.equal(kidSaveRes.body._id);
								(kidUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Kids if not signed in', function(done) {
		// Create new Kid model instance
		var kidObj = new Kid(kid);

		// Save the Kid
		kidObj.save(function() {
			// Request Kids
			request(app).get('/kids')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Kid if not signed in', function(done) {
		// Create new Kid model instance
		var kidObj = new Kid(kid);

		// Save the Kid
		kidObj.save(function() {
			request(app).get('/kids/' + kidObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', kid.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Kid instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Kid
				agent.post('/kids')
					.send(kid)
					.expect(200)
					.end(function(kidSaveErr, kidSaveRes) {
						// Handle Kid save error
						if (kidSaveErr) done(kidSaveErr);

						// Delete existing Kid
						agent.delete('/kids/' + kidSaveRes.body._id)
							.send(kid)
							.expect(200)
							.end(function(kidDeleteErr, kidDeleteRes) {
								// Handle Kid error error
								if (kidDeleteErr) done(kidDeleteErr);

								// Set assertions
								(kidDeleteRes.body._id).should.equal(kidSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Kid instance if not signed in', function(done) {
		// Set Kid user 
		kid.user = user;

		// Create new Kid model instance
		var kidObj = new Kid(kid);

		// Save the Kid
		kidObj.save(function() {
			// Try deleting Kid
			request(app).delete('/kids/' + kidObj._id)
			.expect(401)
			.end(function(kidDeleteErr, kidDeleteRes) {
				// Set message assertion
				(kidDeleteRes.body.message).should.match('User is not logged in');

				// Handle Kid error error
				done(kidDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Kid.remove().exec();
		done();
	});
});