require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Mailgun = require('mailgun.js');
const formData = require('form-data');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Mailgun
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Portfolio Contact <mailgun@${process.env.MAILGUN_DOMAIN}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    res.status(200).json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Mailgun Error:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});