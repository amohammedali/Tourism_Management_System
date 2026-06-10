const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String]
});

module.exports = mongoose.model('Destination', destinationSchema);
