// models/Submission.js
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  person: [String],
  therapy: [String],
  language: [String],
  phone: String,
  timestamp: String
});

module.exports = mongoose.model('Submission', submissionSchema);
