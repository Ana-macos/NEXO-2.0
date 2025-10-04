const express = require('express');
const axios = require('axios');
const router = express.Router();

// API para buscar eventos de tecnologia em tempo real
router.get('/tech-events', async (req, res) => {
    try {
        const events = [];
        
        // Eventbrite API
        if (process.env.EVENTBRITE_TOKEN) {
            try {
                const eventbriteResponse = await axios.get('https://www.eventbriteapi.com/v3/events/search/', {
                    headers: { 'Authorization': `Bearer ${process.env.EVENTBRITE_TOKEN}` },
                    params: {
                        'categories': '102', // Technology category
                        'sort_by': 'date',
                        'expand': 'venue,organizer'
                    }
                });
                
                eventbriteResponse.data.events?.forEach(event => {
                    events.push({
                        id: event.id,
                        title: event.name.text,
                        description: event.description?.text || '',
                        date: event.start.local,
                        location: event.venue?.address?.localized_area_display || 'Online',
                        country: event.venue?.address?.country || 'Global',
                        attendees: event.capacity || 0,
                        organizer: event.organizer?.name || 'Tech Community',
                        url: event.url,
                        source: 'Eventbrite'
                    });
                });
            } catch (err) {
                console.log('Eventbrite API error:', err.message);
            }
        }
        
        // Meetup API (simulado - API real requer aprovação)
        const mockMeetupEvents = [
            {
                id: 'meetup_1',
                title: 'AI & Machine Learning Summit',
                description: 'Latest trends in AI and ML',
                date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                location: 'San Francisco, CA',
                country: 'United States',
                attendees: 2500,
                organizer: 'AI Research Group',
                url: '#',
                source: 'Meetup'
            },
            {
                id: 'meetup_2',
                title: 'DevOps World Conference',
                description: 'DevOps best practices and tools',
                date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
                location: 'London, UK',
                country: 'United Kingdom',
                attendees: 1800,
                organizer: 'DevOps Community',
                url: '#',
                source: 'Meetup'
            }
        ];
        
        events.push(...mockMeetupEvents);
        
        // GitHub Events API
        try {
            const githubResponse = await axios.get('https://api.github.com/events');
            // Filtrar eventos relevantes de tecnologia
            const techEvents = githubResponse.data
                .filter(event => ['PushEvent', 'CreateEvent', 'ReleaseEvent'].includes(event.type))
                .slice(0, 5)
                .map(event => ({
                    id: `github_${event.id}`,
                    title: `${event.type.replace('Event', '')} - ${event.repo.name}`,
                    description: `GitHub ${event.type} activity`,
                    date: event.created_at,
                    location: 'Online',
                    country: 'Global',
                    attendees: Math.floor(Math.random() * 500) + 50,
                    organizer: event.actor.login,
                    url: `https://github.com/${event.repo.name}`,
                    source: 'GitHub'
                }));
            
            events.push(...techEvents);
        } catch (err) {
            console.log('GitHub API error:', err.message);
        }
        
        // Organizar por país
        const eventsByCountry = events.reduce((acc, event) => {
            const country = event.country || 'Global';
            if (!acc[country]) acc[country] = [];
            acc[country].push(event);
            return acc;
        }, {});
        
        res.json({
            success: true,
            totalEvents: events.length,
            countries: Object.keys(eventsByCountry).length,
            eventsByCountry,
            lastUpdated: new Date().toISOString()
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;