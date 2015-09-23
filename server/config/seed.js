/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    PIN:  '0001',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@test.com',
    password: 'test',
    phone:  '5557654321',
    numChildren:  '2',
    accountFinished:  'true',
    active: 'true',
    children: ["Billy", "Sally"]
  }, {
    provider: 'local',
    PIN:  '0000',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'McAdmin',
    email: 'admin@admin.com',
    password: 'admin',
    phone: '5551234567',
    accountFinished:  'true',
    active: 'true',
    numChildren:  '0'
  }, function() {
      console.log('finished populating users');
    }
  );
});