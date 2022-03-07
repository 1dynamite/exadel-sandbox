const express = require('express');
const router = express.Router();
const handler = require('../handlers/auth');

router.get('/login', handler.login);

router.get('/logout', handler.logout);

router.post('/register', handler.register);


module.exports = router;