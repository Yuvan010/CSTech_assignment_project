const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');
const auth = require('../middleware/authMiddleware');

// Add agent
router.post('/', auth, async (req, res) => {
  const { name, email, mobile, password } = req.body;
  // Validation code here
  const agent = new Agent({ name, email, mobile, password });
  await agent.save();
  res.json(agent);
});

// Get all agents
router.get('/', auth, async (req, res) => {
  const agents = await Agent.find();
  res.json(agents);
});

module.exports = router;
