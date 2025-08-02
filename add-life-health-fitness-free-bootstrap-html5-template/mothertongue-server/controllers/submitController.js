// controllers/submitController.js
const Submission = require('../models/Submission');

exports.handleFormSubmit = async (req, res) => {
  console.log('Received form data:', req.body);
  try {
    const newSubmission = new Submission(req.body);
    await newSubmission.save();
    res.json({ success: true });
  } catch (err) {
    console.error('Error saving to DB:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
