document.addEventListener('DOMContentLoaded', function() {
    // Carregar eventos em tempo real
    async function loadRealTimeEvents() {
        try {
            const response = await fetch('http://localhost:8080/api/events/tech-events');
            const data = await response.json();
            
            if (data.success) {
                updateStats(data.totalEvents, Object.keys(data.eventsByCountry).length);
                renderEvents(data.eventsByCountry);
            }
        } catch (error) {
            console.log('Usando eventos estáticos');
        }
    }
    
    // Atualizar estatísticas
    function updateStats(totalEvents, totalCountries) {
        document.querySelector('[data-target="2847"]').setAttribute('data-target', totalEvents);
        document.querySelector('[data-target="45"]').setAttribute('data-target', totalCountries);
    }
    
    // Renderizar eventos por país
    function renderEvents(eventsByCountry) {
        const eventsSection = document.querySelector('.events-section .container');
        const title = eventsSection.querySelector('h3');
        
        // Limpar conteúdo atual
        eventsSection.innerHTML = '';
        eventsSection.appendChild(title);
        
        Object.entries(eventsByCountry).forEach(([country, events]) => {
            const countrySection = document.createElement('div');
            countrySection.className = 'country-section';
            
            const countryTitle = document.createElement('h4');
            countryTitle.className = 'country-title';
            countryTitle.textContent = country;
            
            const eventsGrid = document.createElement('div');
            eventsGrid.className = 'events-grid';
            
            events.slice(0, 3).forEach(event => {
                const eventDate = new Date(event.date);
                const eventCard = `
                    <div class="event-card" data-category="tecnologia">
                        <div class="event-date">
                            <span class="day">${eventDate.getDate()}</span>
                            <span class="month">${eventDate.toLocaleDateString('pt-BR', {month: 'short'}).toUpperCase()}</span>
                        </div>
                        <div class="event-info">
                            <h4>${event.title}</h4>
                            <p class="event-group">${event.organizer}</p>
                            <p class="event-location">${event.location}</p>
                            <div class="event-meta">
                                <span class="event-attendees">${event.attendees} participantes</span>
                                <button class="join-btn">Participar</button>
                            </div>
                        </div>
                    </div>
                `;
                eventsGrid.innerHTML += eventCard;
            });
            
            countrySection.appendChild(countryTitle);
            countrySection.appendChild(eventsGrid);
            eventsSection.appendChild(countrySection);
        });
        
        // Reativar event listeners
        attachEventListeners();
    }
    
    // Animação de contadores
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 20);
        });
    }
    
    // Carregar eventos e iniciar animações
    loadRealTimeEvents();
    setTimeout(animateCounters, 500);
    
    // Filtros de eventos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adiciona active no clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Animação sutil de filtro
            eventCards.forEach(card => {
                card.style.opacity = '0.5';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 150);
            });
        });
    });
    
    // Busca com sugestões
    const searchInput = document.querySelector('#searchInput');
    const searchButton = document.querySelector('.search-bar button');
    
    searchInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        if (value.length > 2) {
            // Filtro sutil em tempo real
            eventCards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const group = card.querySelector('.event-group').textContent.toLowerCase();
                
                if (title.includes(value) || group.includes(value)) {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.opacity = '0.3';
                    card.style.transform = 'scale(0.95)';
                }
            });
        } else {
            // Reset quando limpar busca
            eventCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            });
        }
    });
    
    // Função para anexar event listeners
    function attachEventListeners() {
        // Botões de participar (apenas para eventos sem onclick)
        const joinBtns = document.querySelectorAll('.join-btn:not([onclick])');
        joinBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                joinEvent(this);
            });
        });
    }
    
    // Dados de eventos por categoria
    const eventsByCategory = {
        tecnologia: [
            { title: 'DevFest São Paulo 2024', group: 'Google Developers', location: 'São Paulo, SP', date: '15 DEZ', attendees: '1.2k', url: null },
            { title: 'React Conf Brasil', group: 'React Community', location: 'Rio de Janeiro, RJ', date: '18 DEZ', attendees: '850', url: null },
            { title: 'AI Summit San Francisco', group: 'AI Research Institute', location: 'San Francisco, CA', date: '22 DEZ', attendees: '3.5k', url: null },
            { title: 'Blockchain Summit London', group: 'Blockchain Council', location: 'Londres, Inglaterra', date: '25 DEZ', attendees: '1.5k', url: null }
        ],
        design: [
            { title: 'UX/UI Design Conference', group: 'Design Community', location: 'São Paulo, SP', date: '20 DEZ', attendees: '680', url: null },
            { title: 'Creative Design Summit', group: 'Designers United', location: 'Rio de Janeiro, RJ', date: '23 DEZ', attendees: '420', url: null },
            { title: 'Figma Design Week', group: 'Figma Community', location: 'Online', date: '28 DEZ', attendees: '2.1k', url: 'https://figma.com/events' }
        ],
        negocios: [
            { title: 'Startup Weekend', group: 'Empreendedores SP', location: 'São Paulo, SP', date: '16 DEZ', attendees: '320', url: null },
            { title: 'Business Innovation Summit', group: 'Innovation Hub', location: 'Belo Horizonte, MG', date: '21 DEZ', attendees: '580', url: null },
            { title: 'Networking Empresarial', group: 'Business Network', location: 'Brasília, DF', date: '27 DEZ', attendees: '450', url: null }
        ],
        saude: [
            { title: 'HealthTech Conference', group: 'Health Innovation', location: 'São Paulo, SP', date: '19 DEZ', attendees: '380', url: null },
            { title: 'Telemedicina Summit', group: 'MedTech Brasil', location: 'Online', date: '24 DEZ', attendees: '620', url: 'https://zoom.us/webinar/register' },
            { title: 'Wellness & Technology', group: 'WellTech Community', location: 'Curitiba, PR', date: '29 DEZ', attendees: '290', url: null }
        ]
    };
    
    // Clique nas categorias
    const categoryCards = document.querySelectorAll('.category-card');
    const modal = document.getElementById('categoryModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalEvents = document.getElementById('modalEvents');
    const closeBtn = document.querySelector('.close');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const categoryName = this.querySelector('h4').textContent;
            
            modalTitle.textContent = `Eventos de ${categoryName}`;
            
            const events = eventsByCategory[category] || [];
            modalEvents.innerHTML = '';
            
            events.forEach(event => {
                const eventCard = `
                    <div class="event-card">
                        <div class="event-date">
                            <span class="day">${event.date.split(' ')[0]}</span>
                            <span class="month">${event.date.split(' ')[1]}</span>
                        </div>
                        <div class="event-info">
                            <h4>${event.title}</h4>
                            <p class="event-group">${event.group}</p>
                            <p class="event-location">${event.location}</p>
                            <div class="event-meta">
                                <span class="event-attendees">${event.attendees} participantes</span>
                                <div class="event-actions">
                                    ${event.location !== 'Online' ? `<button class="map-btn" onclick="openMap('${event.location}')">📍 Mapa</button>` : ''}
                                    <button class="join-btn" onclick="${event.url ? `window.open('${event.url}', '_blank')` : 'joinEvent(this)'}">Participar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                modalEvents.innerHTML += eventCard;
            });
            
            modal.style.display = 'block';
            attachEventListeners();
        });
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.95)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.9)';
        });
    });
    
    // Fechar modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Atualizar eventos a cada 5 minutos
    setInterval(loadRealTimeEvents, 300000);
});

// Função para abrir mapas
function openMap(location) {
    const encodedLocation = encodeURIComponent(location);
    const userAgent = navigator.userAgent;
    
    // Detectar iOS
    if (/iPad|iPhone|iPod/.test(userAgent)) {
        window.open(`maps://maps.apple.com/?q=${encodedLocation}`, '_blank');
    } else {
        // Android/Desktop - Google Maps
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank');
    }
}

// Função para participar de eventos presenciais
function joinEvent(button) {
    button.textContent = 'Participando!';
    button.style.background = '#FF6B35';
    button.style.color = '#FFFFFF';
    
    setTimeout(() => {
        button.textContent = 'Participar';
        button.style.background = 'rgba(255, 107, 53, 0.1)';
        button.style.color = '#FF6B35';
    }, 2000);
}