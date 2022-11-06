const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: { type: String, required:true},
  color: { type: String, required:true},
  content: { type: String, required:true},
  vignette: { type: String, required:true},
  banner: { type: String, required:true},
});
module.exports = mongoose.model('Project', projectSchema);