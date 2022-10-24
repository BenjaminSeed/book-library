const express = require('express');

const router = express.Router();
const bookController = require('../controllers/book');

router.post ('/', bookController.create);
router.get ('/', bookController.read);
router.get ('/:id', bookController.readById);
router.patch ('/:id', bookController.update);
router.delete ('/:id', bookController.destroy);


module.exports = router;