const express = require('express');
const router = express.Router();
const handler = require('../handlers/auth');

router.get('/login', handler.login);

router.get('/logout', handler.logout);


module.exports = router;