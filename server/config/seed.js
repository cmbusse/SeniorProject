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
    PIN:  '1111',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    phone:  '5557654321',
    numChildren:  '2',
    accountFinished:  'true',
    children: ["Billy", "Sally"]
  }, {
    provider: 'local',
    PIN:  '0000',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    phone: '5551234567',
    accountFinished:  'true',
    numChildren:  '0'
  }, function() {
      console.log('finished populating users');
    }
  );
});