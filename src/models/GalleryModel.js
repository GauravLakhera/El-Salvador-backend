const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Gallery', GallerySchema); 