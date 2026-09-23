const express = require('express');
const router = express.Router();
const { getListings, getListingById, createListing, updateListing, deleteListing } = require('../controllers/listingController');
const { upload } = require('../config/cloudinary');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getListings);
router.get('/:id', getListingById);
router.post('/', upload.array('images', 5), createListing);
router.put('/:id', upload.array('images', 5), updateListing);
router.delete('/:id', deleteListing);

module.exports = router;

