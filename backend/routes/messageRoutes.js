const express = require('express');
const router = express.Router();
const { getMessagesByListing, sendMessage } = require('../controllers/messageController');

router.get('/:listingId', getMessagesByListing);
router.post('/', sendMessage);

module.exports = router;
