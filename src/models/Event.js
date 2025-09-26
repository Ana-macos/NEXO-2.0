const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: {
    address: String,
    city: String,
    coordinates: { lat: Number, lng: Number }
  },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxAttendees: { type: Number, default: 50 },
  category: { type: String, enum: ['tech', 'business', 'social', 'sports', 'arts', 'education'] },
  isOnline: { type: Boolean, default: false },
  meetingLink: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);