const express = require('express');
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const router = express.Router();

// Listar eventos
router.get('/', async (req, res) => {
  try {
    const { city, category, date } = req.query;
    let filter = {};
    
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (category) filter.category = category;
    if (date) filter.date = { $gte: new Date(date) };
    
    const events = await Event.find(filter)
      .populate('organizer', 'name')
      .sort({ date: 1 });
    
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar evento
router.post('/', auth, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      organizer: req.user.id
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Participar de evento
router.post('/:id/join', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Evento não encontrado' });
    
    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ error: 'Já está participando deste evento' });
    }
    
    if (event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({ error: 'Evento lotado' });
    }
    
    event.attendees.push(req.user.id);
    await event.save();
    
    res.json({ message: 'Participação confirmada!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;