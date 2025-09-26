// Funcionalidades interativas do NEXO

document.addEventListener('DOMContentLoaded', function() {
    // Sistema de abas
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Mostrar aba inicial (home)
    showTab('home');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            showTab(targetTab);
            
            // Atualizar aba ativa
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    function showTab(tabId) {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }
    
    // Animação suave para links de navegação (mantido para compatibilidade)
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-tab)');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Funcionalidade de busca
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const searchButton = searchForm.querySelector('.btn-primary');

    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Simular busca
            showSearchResults(searchTerm);
        }
    });

    // Busca ao pressionar Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchButton.click();
        }
    });

    // Interação com cards de eventos
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            // Simular abertura de detalhes do evento
            const eventTitle = this.querySelector('h3').textContent;
            showEventDetails(eventTitle);
        });
    });
    
    // Filtros de eventos
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterType = this.textContent;
            filterEvents(filterType);
        });
    });
    
    // Botões de ação do feed
    const postBtns = document.querySelectorAll('.post-btn');
    postBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.textContent;
            handlePostAction(action);
        });
    });
    
    // Botões de administração
    const adminBtns = document.querySelectorAll('.admin-actions button');
    adminBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent;
            handleAdminAction(action);
        });
    });

    // Interação com categorias
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            showCategoryEvents(categoryName);
        });
    });

    // Botões de CTA
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        if (button.textContent.includes('Cadastrar') || 
            button.textContent.includes('Criar Conta') ||
            button.textContent.includes('Entrar')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showAuthModal(this.textContent);
            });
        }
    });

    // Efeito parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-placeholder');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
});

// Função para mostrar resultados de busca
function showSearchResults(searchTerm) {
    // Criar modal de resultados
    const modal = createModal('Resultados da Busca', `
        <div class="search-results">
            <h3>Buscando por: "${searchTerm}"</h3>
            <div class="results-list">
                <div class="result-item">
                    <h4>Meetup de ${searchTerm}</h4>
                    <p>📍 São Paulo, SP • 👥 25 participantes</p>
                </div>
                <div class="result-item">
                    <h4>Workshop de ${searchTerm}</h4>
                    <p>📍 Rio de Janeiro, RJ • 👥 18 participantes</p>
                </div>
                <div class="result-item">
                    <h4>Networking ${searchTerm}</h4>
                    <p>📍 Belo Horizonte, MG • 👥 32 participantes</p>
                </div>
            </div>
        </div>
    `);
    showModal(modal);
}

// Função para mostrar detalhes do evento
function showEventDetails(eventTitle) {
    const modal = createModal(eventTitle, `
        <div class="event-details">
            <div class="event-header">
                <div class="event-date-large">
                    <span class="day">15</span>
                    <span class="month">DEZ</span>
                    <span class="year">2024</span>
                </div>
                <div class="event-time">
                    <p><strong>19:00 - 22:00</strong></p>
                    <p>📍 São Paulo, SP</p>
                </div>
            </div>
            <div class="event-description-full">
                <h4>Sobre o evento</h4>
                <p>Este é um evento incrível onde você poderá conhecer pessoas com interesses similares, aprender coisas novas e expandir sua rede de contatos.</p>
                <h4>O que esperar</h4>
                <ul>
                    <li>Networking com profissionais da área</li>
                    <li>Apresentações inspiradoras</li>
                    <li>Coffee break incluído</li>
                </ul>
            </div>
            <div class="event-actions">
                <button class="btn-primary">Participar do Evento</button>
                <button class="btn-secondary">Compartilhar</button>
            </div>
        </div>
    `);
    showModal(modal);
}

// Função para mostrar eventos por categoria
function showCategoryEvents(categoryName) {
    const modal = createModal(`Eventos de ${categoryName}`, `
        <div class="category-events">
            <p>Explore todos os eventos relacionados a <strong>${categoryName}</strong></p>
            <div class="events-list">
                <div class="event-item">
                    <h4>Meetup de ${categoryName} - Iniciantes</h4>
                    <p>📅 20 Dez • 📍 São Paulo • 👥 15 vagas</p>
                </div>
                <div class="event-item">
                    <h4>Workshop Avançado de ${categoryName}</h4>
                    <p>📅 25 Dez • 📍 Rio de Janeiro • 👥 8 vagas</p>
                </div>
                <div class="event-item">
                    <h4>Conferência ${categoryName} 2024</h4>
                    <p>📅 30 Dez • 📍 Belo Horizonte • 👥 50 vagas</p>
                </div>
            </div>
        </div>
    `);
    showModal(modal);
}

// Função para mostrar modal de autenticação
function showAuthModal(action) {
    const isLogin = action.includes('Entrar');
    const title = isLogin ? 'Entrar no NEXO' : 'Criar Conta no NEXO';
    const content = `
        <div class="auth-form">
            <form>
                ${!isLogin ? '<input type="text" placeholder="Nome completo" class="form-input">' : ''}
                <input type="email" placeholder="E-mail" class="form-input">
                <input type="password" placeholder="Senha" class="form-input">
                ${!isLogin ? '<input type="password" placeholder="Confirmar senha" class="form-input">' : ''}
                <button type="submit" class="btn-primary btn-full">${action}</button>
            </form>
            <p class="auth-switch">
                ${isLogin ? 'Não tem conta?' : 'Já tem conta?'} 
                <a href="#" onclick="switchAuthMode()">${isLogin ? 'Cadastre-se' : 'Faça login'}</a>
            </p>
        </div>
    `;
    const modal = createModal(title, content);
    showModal(modal);
}

// Função para criar modal
function createModal(title, content) {
    return `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        </div>
    `;
}

// Função para mostrar modal
function showModal(modalHTML) {
    // Remove modal existente se houver
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }

    // Adiciona novo modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';

    // Adiciona estilos do modal se não existirem
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(30, 42, 56, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            .modal-content {
                background-color: #FFFFFF;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 24px;
                border-bottom: 1px solid #F4F5F7;
            }
            .modal-header h3 {
                color: #1E2A38;
                margin: 0;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #A0A4A8;
            }
            .modal-body {
                padding: 24px;
            }
            .form-input {
                width: 100%;
                padding: 12px;
                margin-bottom: 16px;
                border: 1px solid #F4F5F7;
                border-radius: 8px;
                font-size: 16px;
            }
            .btn-full {
                width: 100%;
            }
            .auth-switch {
                text-align: center;
                margin-top: 16px;
                color: #A0A4A8;
            }
            .auth-switch a {
                color: #FF6B35;
                text-decoration: none;
            }
            .result-item, .event-item {
                padding: 16px;
                border: 1px solid #F4F5F7;
                border-radius: 8px;
                margin-bottom: 12px;
            }
            .event-header {
                display: flex;
                gap: 20px;
                margin-bottom: 20px;
            }
            .event-date-large {
                background-color: #FF6B35;
                color: #FFFFFF;
                padding: 16px;
                border-radius: 8px;
                text-align: center;
                min-width: 80px;
            }
            .event-date-large .day {
                display: block;
                font-size: 24px;
                font-weight: 800;
            }
            .event-date-large .month {
                display: block;
                font-size: 12px;
            }
            .event-date-large .year {
                display: block;
                font-size: 12px;
            }
            .event-actions {
                display: flex;
                gap: 12px;
                margin-top: 20px;
            }
        `;
        document.head.appendChild(modalStyles);
    }
}

// Função para fechar modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Função para alternar modo de autenticação
function switchAuthMode() {
    closeModal();
    // Determinar qual modal mostrar baseado no contexto
    const isCurrentlyLogin = document.querySelector('.modal-content h3').textContent.includes('Entrar');
    showAuthModal(isCurrentlyLogin ? 'Cadastrar' : 'Entrar');
}

// Função para filtrar eventos
function filterEvents(filterType) {
    console.log(`Filtrando eventos por: ${filterType}`);
    // Aqui você implementaria a lógica de filtro real
    showNotification(`Eventos filtrados por: ${filterType}`);
}

// Função para lidar com ações do post
function handlePostAction(action) {
    if (action.includes('Curtidas')) {
        showNotification('Post curtido!');
    } else if (action.includes('Comentários')) {
        showNotification('Abrindo comentários...');
    } else if (action.includes('Compartilhar')) {
        showNotification('Post compartilhado!');
    }
}

// Função para lidar com ações de administração
function handleAdminAction(action) {
    const modal = createModal(`Administração - ${action}`, `
        <div class="admin-action-content">
            <p>Você selecionou: <strong>${action}</strong></p>
            <p>Esta funcionalidade estará disponível em breve.</p>
            <div style="margin-top: 20px;">
                <button class="btn-primary" onclick="closeModal()">Entendi</button>
            </div>
        </div>
    `);
    showModal(modal);
}

// Função para mostrar notificações
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Adicionar estilos se não existirem
    if (!document.querySelector('#notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'notification-styles';
        notificationStyles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: #FF6B35;
                color: #FFFFFF;
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
                z-index: 1001;
                animation: slideIn 0.3s ease;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(notificationStyles);
    }
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}