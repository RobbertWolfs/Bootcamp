var express = require('express');
var router = express.Router();
var authController = require('../controllers/authcontroller');

// POST /api/auth/authenticate
router.post('/authenticate', authController.authenticate);


module.exports = router;

