const mongoose = require('mongoose');
const DistributedListSchema = new mongoose.Schema({
  agentId: mongoose.Schema.Types.ObjectId,
  items: [{ firstName: String, phone: String, notes: String }]
});
module.exports = mongoose.model('DistributedList', DistributedListSchema);
