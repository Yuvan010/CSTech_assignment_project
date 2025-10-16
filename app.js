require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Enable CORS for frontend communication
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB with error handling
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use('/api/agents', require('./routes/agents'));
app.use('/api/lists', require('./routes/lists'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));