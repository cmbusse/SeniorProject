'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

/*
*  So it looks like the /:id/password means that in comp/auth/auth.service.js it
*  checks the :id when calling the function, and then the password part is the
*  "body" of the parameters, where old and new passwords are
*/

/*
router.get('/', auth.hasRole('admin'), controller.index);

CHANGED TO

router.get('/', auth.isAuthenticated(), controller.index);
*/

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/finished', auth.isAuthenticated(), controller.updateFinished);
router.put('/admin/role', auth.hasRole('admin'), controller.changeRole);
router.put('/:id/children', auth.isAuthenticated(), controller.addChild);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
