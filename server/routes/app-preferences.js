const express = require('express');
const router = express.Router();
const handler = require('../handlers/app-preferences');

router.put('/language-set', handler.setLanguage);

router.put('/country-set', handler.setCountry);


module.exports = router;