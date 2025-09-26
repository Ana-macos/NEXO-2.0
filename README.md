# Nexo - Plataforma de Eventos

Conectando pessoas através de eventos locais e online.

## Funcionalidades

- 🎯 **Descoberta de Eventos**: Encontre eventos por categoria, localização e data
- 👤 **Autenticação**: Sistema completo de registro e login
- 📅 **Criação de Eventos**: Organize seus próprios eventos
- 🌐 **Eventos Online/Presencial**: Suporte para ambos os formatos
- 👥 **Participação**: Sistema de inscrição em eventos
- 📍 **Localização**: Filtros por cidade e coordenadas

## Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Iniciar em desenvolvimento
npm run dev

# Iniciar em produção
npm start
```

## API Endpoints

### Autenticação
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login

### Eventos
- `GET /api/events` - Listar eventos
- `POST /api/events` - Criar evento (autenticado)
- `POST /api/events/:id/join` - Participar de evento (autenticado)

### Usuários
- `GET /api/users/profile` - Perfil do usuário (autenticado)
- `PUT /api/users/profile` - Atualizar perfil (autenticado)

## Tecnologias

- Node.js + Express
- MongoDB + Mongoose
- JWT para autenticação
- bcryptjs para hash de senhas

## Inspirado no Meetup

O Nexo foi inspirado na plataforma Meetup.com, focando em:
- Simplicidade na criação de eventos
- Descoberta baseada em localização
- Comunidades por interesse
- Interface intuitiva