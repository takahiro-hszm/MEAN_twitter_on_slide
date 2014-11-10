'use strict';

var express = require('express');
var controller = require('./upload.controller');

var router = express.Router();


var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.post('/user', controller.index);
router.post('/', multipartMiddleware, controller.create);

module.exports = router;