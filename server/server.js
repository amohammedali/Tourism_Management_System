const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const Destination = require('./models/Destination');
const Booking = require('./models/Booking');
const User = require('./models/User');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/tourism_db')
  .then(() => console.log('Connected to MongoDB (tourism_db)'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// API Routes

// --- Destinations ---
app.get('/api/destinations', async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ id: 1 });
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Bookings ---
app.post('/api/bookings', async (req, res) => {
  const booking = new Booking(req.body);
  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- Authentication ---

// Register User
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully', user: { name, email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login User
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
