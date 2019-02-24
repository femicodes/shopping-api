const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.delete('/:userID', checkAuth, UserController.delete);

module.exports = router;