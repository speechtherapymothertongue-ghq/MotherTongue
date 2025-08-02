const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;

// ✅ 1. Place CORS and express.json() BEFORE all routes
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Replace with your frontend origin
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json()); // Parse JSON bodies

// ✅ 2. Connect MongoDB
const mongoURI = 'mongodb+srv://aadijp6:yveqZStfxRtWF1Gb@cluster0.oxuhx4i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // TODO: paste your Mongo URI here

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ 3. Define Schema + Model
const submissionSchema = new mongoose.Schema({
  person: [String],
  therapy: [String],
  language: [String],
  phone: String,
  timestamp: String
});
const Submission = mongoose.model('Submission', submissionSchema);

// ✅ 4. Handle form POST
app.post('/api/submit', async (req, res) => {
  console.log('Received form data:', req.body);
  try {
    const newSubmission = new Submission(req.body);
    await newSubmission.save();
    res.json({ success: true });
  } catch (err) {
    console.error('Error saving to DB:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ✅ 5. Fallback route for unknown paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ✅ 6. Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
