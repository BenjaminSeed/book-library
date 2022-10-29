const express = require('express');

const router = express.Router();
const authorController = require('../controllers/author');

router.post ('/', authorController.createAuthors);
router.get ('/', authorController.getAuthor);
router.get ('/:id', authorController.getAuthorById);
router.patch ('/:id', authorController.updateAuthors);
router.delete ('/:id', authorController.deleteAuthor);

module.exports = router;