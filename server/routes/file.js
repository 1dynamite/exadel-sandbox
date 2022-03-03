const express = require('express');
const router = express.Router();
const handler = require('../handlers/file');


router.route('/')
  .get(handler.read)
  .post(handler.upload)
  .delete(handler.remove);
  

module.exports = router;