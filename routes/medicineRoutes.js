// routes/medicineRoutes.js
const express = require('express');
const { getMedicineData } = require('../controllers/medicineController');

const router = express.Router();

// Endpoint to get aggregated medicine data by name
router.get('/medicines/:name', getMedicineData);

module.exports = router;