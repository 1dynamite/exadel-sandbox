const express = require('express');
const router = express.Router();
const handler = require('../handlers/income-category');

router.post('/', handler.create);

router.route('/:id')
  .get(handler.read)
  .put(handler.update)
  .delete(handler.remove);

module.exports = router;