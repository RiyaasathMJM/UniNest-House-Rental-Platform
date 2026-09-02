const express = require('express');
const router = express.Router();
const {
  createApplication,
  getStudentApplications,
  getLandlordApplications,
  updateApplicationStatus
} = require('../controllers/applicationController');

router.post('/', createApplication);
router.get('/student', getStudentApplications);
router.get('/landlord', getLandlordApplications);
router.patch('/:id/status', updateApplicationStatus);

module.exports = router;
