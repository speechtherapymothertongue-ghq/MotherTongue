// controllers/submitController.js
require('dotenv').config();
const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const Submission = require('../models/Submission');

console.log(process.env.TWILIO_WHATSAPP_NUMBER);
const sendWhatsAppMessage = async (to, message) => {
  try {
    const res = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${to}`, // e.g., whatsapp:+919876543210
      body: message
    });
    console.log('Message sent:', res.sid);
  } catch (err) {
    console.error('Failed to send WhatsApp message here:', err);
  }
};

exports.handleFormSubmit = async (req, res) => {
  console.log('Received form data:', req.body);
  try {
    const newSubmission = new Submission(req.body);
    await newSubmission.save();
    res.json({ success: true });
    const fullphone = req.body.fullphone;
    console.log(fullphone,"This is the received fullphone");
    await sendWhatsAppMessage(fullphone, 'Thanks for submitting the form!');

  } catch (err) {
    console.error('Error saving to DB:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
