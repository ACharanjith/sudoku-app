const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sudoku', { useNewUrlParser: true, useUnifiedTopology: true });

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', userSchema);

// Signup
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  if (await User.findOne({ username })) return res.json({ success: false, msg: "User exists" });
  await User.create({ username, password });
  res.json({ success: true });
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  res.json({ success: !!user });
});

// Start server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
