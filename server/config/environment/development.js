'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  
  mongo: {
    uri: 'mongodb://localhost/daycamp-dev'
  },
	/*
	db: {
		uri: 'mongodb://acomadmin:coma3031@ds050087.mongolab.com:50087/areacom',
		options: {
		user: '',
		pass: ''
		}
	},
	*/
  seedDB: true
};
