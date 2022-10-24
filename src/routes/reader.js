const express = require('express');

const router = express.Router();
const readerController = require('../controllers/reader');

router.post ('/', readerController.create);
router.get ('/', readerController.read);
router.get ('/:id', readerController.readById);
router.patch ('/:id', readerController.update);
router.delete ('/:id', readerController.destroy);

module.exports = router;