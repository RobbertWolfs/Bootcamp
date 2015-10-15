var express = require('express');
var router = express.Router();
var validator = require('../middleware/requestValidator');
var userController = require('../controllers/usercontroller');
var keyController = require('../controllers/keycontroller');
var auth = require('../middleware/authorize');

// var UserModel = require('../models/user');
// var userMapper = require('../mappers/userMapper');



var userSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 10, optional: false },
        email: { type: 'string', pattern: 'email', optional: false },
        age: { type: 'number', optional: true },
        address: { type: 'string', optional: true },
        city: { type: 'string', optional: true },
        zip: { type: 'string', optional: true },
    }
};

var keySchema = {
    type : 'object',
    properties : {
        name: { type: 'string', optional: false }
    }
};


// GET /api/users?page=0&pageSize=20&sort=+age
router.get('/', userController.findAll);

// GET /api/users/123
router.get('/:id', userController.findOne);

// PUT /api/users/123
router.put('/:id', auth.authenticate(), validator(userSchema), userController.update);

// POST /api/users
router.post('/', auth.authenticate(), validator(userSchema), userController.create);

// DELETE /api/users/12213
router.delete('/:id', auth.authenticate(), userController.remove);

// POST /api/users/123/keys
router.post('/:id/keys', validator(keySchema), keyController.generate);

// DELETE /api/users/12213/keys/name
router.delete('/:id/keys/:name', keyController.remove);

// GET /api/users/123/keys
router.get('/:id/keys', keyController.findAll);

module.exports = router;
