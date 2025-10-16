const express = require('express');
const router = express.Router();
const multer = require('multer');
const XLSX = require('xlsx');
const auth = require('../middleware/authMiddleware');
const Agent = require('../models/Agent');
const DistributedList = require('../models/DistributedList');

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only CSV and Excel files are allowed.'));
    }
  }
});

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Parse the file
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    if (data.length === 0) {
      return res.status(400).json({ error: 'File is empty' });
    }

    // Validate required columns - check for firstName and phone in various formats
    const firstRow = data[0];
    const keys = Object.keys(firstRow).map(k => k.toLowerCase());
    
    const hasFirstName = keys.some(k => k.includes('firstname') || k.includes('first'));
    const hasPhone = keys.some(k => k.includes('phone') || k.includes('mobile') || k.includes('number'));

    if (!hasFirstName || !hasPhone) {
      return res.status(400).json({ 
        error: 'CSV must contain FirstName and Phone columns' 
      });
    }

    // Normalize data to handle case variations and field name variations
    const normalizedData = data.map(row => {
      const firstName = row.firstName || row.firstname || row.FirstName || 
                       row['First Name'] || row['first name'] || '';
      const phone = row.phone || row.Phone || row.mobile || row.Mobile || 
                   row.number || row.Number || row['Phone Number'] || '';
      const notes = row.notes || row.Notes || row.note || row.Note || '';
      
      return {
        firstName: String(firstName).trim(),
        phone: String(phone).trim(),
        notes: String(notes).trim()
      };
    }).filter(item => item.firstName && item.phone); // Filter out empty rows

    if (normalizedData.length === 0) {
      return res.status(400).json({ 
        error: 'No valid data found in CSV. Ensure FirstName and Phone columns have values.' 
      });
    }

    // Get all agents
    const agents = await Agent.find();
    if (agents.length === 0) {
      return res.status(400).json({ error: 'No agents found. Please add agents first.' });
    }

    // Distribute data evenly among agents
    const itemsPerAgent = Math.ceil(normalizedData.length / agents.length);
    const distributions = [];

    // Clear old distributions
    await DistributedList.deleteMany({});

    for (let i = 0; i < agents.length; i++) {
      const startIdx = i * itemsPerAgent;
      const endIdx = Math.min(startIdx + itemsPerAgent, normalizedData.length);
      const agentItems = normalizedData.slice(startIdx, endIdx);

      if (agentItems.length > 0) {
        const distributedList = new DistributedList({
          agentId: agents[i]._id,
          items: agentItems
        });
        await distributedList.save();

        distributions.push({
          agentName: agents[i].name,
          agentEmail: agents[i].email,
          items: agentItems
        });
      }
    }

    res.json(distributions);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

// Get distributed list for logged-in agent (optional route)
router.get('/my-list', auth, async (req, res) => {
  try {
    const list = await DistributedList.findOne({ agentId: req.user.id });
    res.json(list || { items: [] });
  } catch (error) {
    console.error('Error fetching list:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;