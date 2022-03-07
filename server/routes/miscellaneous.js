const express = require('express');
const router = express.Router();
const handler = require('../handlers/miscellaneous');

router.get('/balance', handler.balance);

router.get('/recover-password', handler.recoverPassword);

module.exports = router;