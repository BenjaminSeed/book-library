const express = require('express');

const router = express.Router();
const readerController = require('../controllers/reader');

router.post ('/', readerController.createReaders);
router.get ('/', readerController.getReaders);
router.get ('/:id', readerController.getReaderById);
router.patch ('/:id', readerController.updateReaders);
router.delete ('/:id', readerController.deleteReader);

module.exports = router;