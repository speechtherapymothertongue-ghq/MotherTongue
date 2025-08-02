// routes/formRoutes.js
const express = require('express');
const router = express.Router();
const { handleFormSubmit } = require('../controllers/submitController');

router.post('/submit', handleFormSubmit);

module.exports = router;
